package com.arc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.arc.service.OAuth2Service;

@RestController
//@RequestMapping("/")
public class HomeController {
	
	@Autowired
	private OAuth2Service oAuth2Service;
	
	@GetMapping
	public ResponseEntity<?> name() {
		return ResponseEntity.ok("<h1>Home</h1>");
	}
	
	@GetMapping("/login/oauth2/code/google")
    public ResponseEntity<?> handleGoogleCallback(@RequestParam("code") String code) {
        // Exchange code for access token
        String tokenResponse = oAuth2Service.exchangeCodeForToken(code);

        // Extract access token from tokenResponse
        // For demonstration purposes, assuming tokenResponse is a JSON string with access_token field
        // You should use a JSON library to extract the access token
        String accessToken = extractAccessToken(tokenResponse);

        // Fetch user info using the access token
        String userInfo = oAuth2Service.getUserInfo(accessToken);

        // Return user info as response (for demonstration)
        return ResponseEntity.ok(userInfo);
    }

    private String extractAccessToken(String tokenResponse) {
        // Example of extracting access token (use a JSON library in a real application)
        // Here you might need to parse JSON to extract access token
        // For demonstration:
        // JSONObject json = new JSONObject(tokenResponse);
        // return json.getString("access_token");

        // Dummy implementation:
        return tokenResponse; // Replace this with actual token extraction logic
    }


	
}
