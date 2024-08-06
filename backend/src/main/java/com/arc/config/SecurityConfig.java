package com.arc.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.arc.entities.User;
import com.arc.exception.UserNotFoundException;
import com.arc.repository.UserRepository;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig {
	
	@Autowired
	private UserRepository userRepository;
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}	
	
	@Bean
	UserDetailsService userDetailsService() {
		return new UserDetailsService() {
			
			@Override
			public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
				User user = userRepository.findByEmail(username)
						.orElseThrow(()->new UserNotFoundException("User with username "+ username+" not found"));
				
				return new org.springframework.security.core.userdetails
						.User(user.getEmail(), user.getPassword(), user.getAuthorities());
			}
		};
	}

    @Bean
    SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(csrf -> csrf.disable())
        		.cors(cors-> cors.configurationSource(corsConfigurationSource()))
        		.authorizeHttpRequests(requests -> requests
                        .requestMatchers("/users/**").hasRole("Admin")
                        .requestMatchers("/adoptions/**").hasRole("Admin")
                        .anyRequest().permitAll())
                .formLogin(form -> form
                        .permitAll()
                        .defaultSuccessUrl("/users"))
                .logout(logout -> logout.permitAll())
                .userDetailsService(userDetailsService());
        
        httpSecurity.oauth2Login(Customizer.withDefaults()).logout(logout->logout.permitAll());
		return httpSecurity.build();
	}

    @Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config =  new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList("http://localhost:8080","http://localhost:3000"));
		config.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE"));
		config.setAllowedHeaders(Arrays.asList("*"));
		config.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}
 
}
