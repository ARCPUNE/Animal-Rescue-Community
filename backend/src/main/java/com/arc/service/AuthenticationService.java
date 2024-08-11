package com.arc.service;

import com.arc.dto.JWTAuthenticationResponse;
import com.arc.dto.JwtRequest;
import com.arc.dto.RefreshTokenRequest;
import com.arc.dto.SignUpRequest;
import com.arc.entities.User;

public interface AuthenticationService {

	User signup(SignUpRequest request);
	
	JWTAuthenticationResponse login(JwtRequest request) throws Exception;

	JWTAuthenticationResponse refreshToken(RefreshTokenRequest request);

}
