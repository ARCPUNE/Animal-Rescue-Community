package com.arc.security.jwt;

import java.util.HashMap;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {

	String extractUserName(String token);
	
	String generateToken(UserDetails userDetails);
	
	boolean isTokenValid(String token, UserDetails userDetails);

	String generateRefreshToken(HashMap<String, Object> extraClaims, UserDetails userDetails);

	String generateToken(String email);
	
}
