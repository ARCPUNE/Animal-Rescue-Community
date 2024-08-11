package com.arc.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.arc.security.jwt.JwtAuthenticationFilter;
import com.arc.service.UserService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
public class SecurityConfig {
	
	@Value("${frontend.url}")
	private String frontendURL;
	
	@Value("${backend.url}")
	private String backendURL;
	
//	private final OAuth2SuccessHandler oAuth2SuccessHandler;
	private final UserService userService;
    private final JwtAuthenticationFilter filter;
    private final PasswordEncoder encoder;
	
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
        	.csrf(csrf -> csrf.disable())
    		.cors(cors-> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(requests -> 
            requests
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/api/users").hasRole("Admin")
                .anyRequest().authenticated())
//            	.oauth2Login(oAuth2->
//            		oAuth2.successHandler(oAuth2SuccessHandler))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider())
        ;
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
									 
		return http.build();
	}
    
    @Bean
    AuthenticationProvider authenticationProvider() {
    	DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
    	provider.setUserDetailsService(userService);
    	provider.setPasswordEncoder(encoder);
		return provider;
	}


	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config =  new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList(frontendURL,backendURL));
		config.setAllowedMethods(Arrays.asList("*"));
		config.setAllowedHeaders(Arrays.asList("*"));
		config.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}
    
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
    	return builder.getAuthenticationManager();
    }
    
}
