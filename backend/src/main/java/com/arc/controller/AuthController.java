package com.arc.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arc.dto.JwtRequest;
import com.arc.dto.JwtResponse;
import com.arc.dto.SignUpRequest;
import com.arc.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthenticationService authenticationService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody JwtRequest request) throws Exception {

		JwtResponse response = authenticationService.login(request);
		return new ResponseEntity<>(response, HttpStatus.OK);

	}

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody SignUpRequest request) {
		
		UserDetails signup = authenticationService.signup(request);
		return new ResponseEntity<>(signup, HttpStatus.OK);
	}

}
