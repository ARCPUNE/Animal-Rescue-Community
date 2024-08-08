package com.arc.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.arc.service.GoogleTokenVerifier;

@Service
public class GoogleTokenVerifierImpl implements GoogleTokenVerifier {

    @Autowired
    private RestTemplate restTemplate;
    private static final String GOOGLE_TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo?id_token=";

    @Override
    public Map<String, Object> verifyToken(String token) {
        String url = GOOGLE_TOKEN_INFO_URL + token;
        @SuppressWarnings("unchecked")
		Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        if (response != null && response.containsKey("email")) {
            return response;
        } else {
            throw new IllegalArgumentException("Invalid ID token");
        }
    }
}

