package com.arc.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.arc.repository.UserRepository;
import com.arc.security.OAuth2SuccessHandler;
import com.arc.service.GoogleTokenVerifier;

@RestController
public class AuthController {

	@Autowired
	private GoogleTokenVerifier googleTokenVerifier;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private OAuth2SuccessHandler oAuth2UserService;

	@PostMapping("/api/auth/google")
	public ResponseEntity<?> authenticateWithGoogle(@RequestBody Map<String, String> body) {
		String token = body.get("token");
		Map<String, Object> attributes = googleTokenVerifier.verifyToken(token);

		String email = (attributes.get("email") != null) ? attributes.get("email").toString() : "";
		String name = (attributes.get("name") != null) ? attributes.get("name").toString() : "";

		if (email.isEmpty()) {
			return ResponseEntity.badRequest().body("Email is not available in the OAuth2 attributes");
		}

		userRepository.findByEmail(email).ifPresentOrElse(user -> {
			// Authenticate existing user
			oAuth2UserService.authenticateExistingUser(user, attributes, "google");
		}, () -> {
			// Create and authenticate a new user if not found
			oAuth2UserService.createAndAuthenticateNewUser(name, email, "google", attributes);
		});

		return ResponseEntity.ok().body("User authenticated successfully");
	}
}
