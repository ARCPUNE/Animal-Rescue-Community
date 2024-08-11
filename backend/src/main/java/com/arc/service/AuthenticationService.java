package com.arc.service;

import com.arc.dto.JwtRequest;
import com.arc.dto.JwtResponse;
import com.arc.dto.SignUpRequest;
import com.arc.entities.User;

public interface AuthenticationService {

	User signup(SignUpRequest request);
	
	JwtResponse login(JwtRequest request) throws Exception;

}
