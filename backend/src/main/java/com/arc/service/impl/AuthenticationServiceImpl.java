package com.arc.service.impl;

import java.util.HashMap;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.arc.dto.JWTAuthenticationResponse;
import com.arc.dto.JwtRequest;
import com.arc.dto.RefreshTokenRequest;
import com.arc.dto.SignUpRequest;
import com.arc.entities.Role;
import com.arc.entities.User;
import com.arc.exception.InvalidJWTTokenException;
import com.arc.exception.UserAlreadyExistsException;
import com.arc.repository.UserRepository;
import com.arc.security.jwt.JwtService;
import com.arc.service.AuthenticationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

	private final UserRepository userRepository;
	private final PasswordEncoder encoder;
	private final ModelMapper mapper;
	private final AuthenticationManager manager;
	private final JwtService jwtService;
	private final UserDetailsService userDetailsService;
	
	@Override
	public User signup(SignUpRequest request) {
		
		if (userRepository.existsByEmail(request.getEmail())) {
			throw new UserAlreadyExistsException("User with email address " + request.getEmail()+" already exists");
		}
		
		User user = mapper.map(request, User.class);
		user.setPassword(encoder.encode(request.getPassword()));
		user.setRole(Role.ROLE_Volunteer);
		return userRepository.save(user);
	}

	@Override
	public JWTAuthenticationResponse login(JwtRequest request) throws Exception {
		this.doAuthenticate(request.getEmail(), request.getPassword());


        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = this.jwtService.generateToken(userDetails);
        String refreshToken = this.jwtService.generateRefreshToken(new HashMap<String, Object>() , userDetails);

		return JWTAuthenticationResponse.builder()
	              .token(token)
	              .refreshToken(refreshToken)
	              .username(userDetails.getUsername())
	              .build();
	}
	
	@Override
	public JWTAuthenticationResponse refreshToken(RefreshTokenRequest request) {
		String userEmail = jwtService.extractUserName(request.getToken());
		log.info("Refresh Token Request received from "+ userEmail);
		User user = userRepository.findByEmail(userEmail).orElseThrow(()->new InvalidJWTTokenException("Invalid Token"));
		
		if (jwtService.isTokenValid(request.getToken(), user)) {
			String token = jwtService.generateToken(user);
			
		return JWTAuthenticationResponse.builder()
	              .token(token)
	              .refreshToken(request.getToken())
	              .username(user.getUsername())
	              .build();
		}
		throw new InvalidJWTTokenException("Invalid Token");
	}
	
	private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);


        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }

    }
}
