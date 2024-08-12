package com.arc.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
//        	.cors(cors->cors.disable())
//    		.cors(cors-> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(requests -> 
            requests
            	.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                .requestMatchers("/auth/**","/","/forgot/**","/swagger-ui/index.html","/oauth2/authorization/google").permitAll()
                .requestMatchers("/api/users").hasRole("Admin")
                .anyRequest().authenticated())
//            	.oauth2Login(oAuth2->
//            		oAuth2.successHandler(oAuth2SuccessHandler))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider())
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration corsConfiguration = new CorsConfiguration();
                corsConfiguration.addAllowedOrigin(frontendURL);
                corsConfiguration.addAllowedMethod("*");
                corsConfiguration.addAllowedHeader("*");
                corsConfiguration.setAllowCredentials(true);
                return corsConfiguration;
            }))
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
    AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
    	return builder.getAuthenticationManager();
    }
    
}
