package com.arc.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.arc.security.service.UserDetialsServiceImpl;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig {
	
	@Value("${frontend.url}")
	private String frontendURL;
	
	@Value("${backend.url}")
	private String backendURL;
	
	@Autowired
	private OAuth2SuccessHandler oAuth2SuccessHandler;
	
	@Autowired
	private UserDetialsServiceImpl userDetailsService;
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

    @Bean
    SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
        .csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
        		.cors(cors-> cors.configurationSource(corsConfigurationSource()))
        		.sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        		.authorizeHttpRequests(requests -> requests
        				.requestMatchers("/users/**").authenticated()
        				.requestMatchers("/login/oauth2/code/google").permitAll()
                          .requestMatchers("/", "/index.html", "/login**", "/error**").permitAll()
                        .anyRequest().permitAll())
                .formLogin(form -> form.disable())
                .logout(logout -> logout.permitAll())
                .userDetailsService(userDetailsService);
        
        httpSecurity.oauth2Login(oAuth2->oAuth2.successHandler(oAuth2SuccessHandler))
        			.logout(logout->logout.permitAll());
		return httpSecurity.build();
	}
    

    @Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config =  new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList("http://localhost:8080/","http://localhost:5173/"));
		config.setAllowedMethods(Arrays.asList("*"));
		config.setAllowedHeaders(Arrays.asList("*"));
		config.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}
    
    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withJwkSetUri("https://your-authorization-server/.well-known/jwks.json").build();
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        return new JwtAuthenticationConverter();
    }

    
}
