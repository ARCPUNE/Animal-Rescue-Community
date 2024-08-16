package com.arc.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arc.dto.JwtRequest;
import com.arc.dto.RefreshTokenRequest;
import com.arc.dto.SignUpRequest;
import com.arc.dto.UserDTO;
import com.arc.service.AuthenticationService;
import com.arc.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthController {

	private final AuthenticationService authenticationService;
	private final UserService userService;

	@CrossOrigin(origins = "http://localhost:5173")
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody JwtRequest request) throws Exception {
		log.info("LOGIN Request received from "+request.getEmail());
		return ResponseEntity.ok(authenticationService.login(request));

	}

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody SignUpRequest request) {
		log.info("SIGN UP Request received from "+request.getEmail());
		return ResponseEntity.ok(authenticationService.signup(request));
	}
	
	@PostMapping("/sign-up")
	public ResponseEntity<?> addNewUser(@Valid @RequestBody UserDTO userDTO) {
		return ResponseEntity.status(HttpStatus.OK).body(userService.addNewUser(userDTO)); 
	}
	
	@PostMapping("/refresh")
	public ResponseEntity<?> refresh(@RequestBody RefreshTokenRequest request) throws Exception {
		
		return ResponseEntity.ok(authenticationService.refreshToken(request));
	}

}
