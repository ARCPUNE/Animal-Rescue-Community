package com.arc.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.arc.dto.JwtRequest;
import com.arc.dto.JwtResponse;
import com.arc.dto.SignUpRequest;
import com.arc.entities.Role;
import com.arc.entities.User;
import com.arc.exception.UserAlreadyExistsException;
import com.arc.repository.UserRepository;
import com.arc.security.jwt.JwtService;
import com.arc.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@Service
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
	public JwtResponse login(JwtRequest request) throws Exception {
		this.doAuthenticate(request.getEmail(), request.getPassword());


        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = this.jwtService.generateToken(userDetails);

		return JwtResponse.builder()
	              .jwtToken(token)
	              .username(userDetails.getUsername())
	              .build();
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
