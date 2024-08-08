package com.arc.service;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface GoogleTokenVerifier {

	Map<String, Object> verifyToken(String token);

}

