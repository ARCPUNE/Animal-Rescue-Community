package com.arc.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.arc.service.OAuth2Service;

@Service
public class OAuth2ServiceImpl implements OAuth2Service {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${google.token.url}")
    private String tokenUrl;

    @Value("${google.userinfo.url}")
    private String userinfoUrl;

    @Autowired
    private RestTemplate restTemplate;


    @Override
    public String exchangeCodeForToken(String code) {
        // Prepare the token request
        String tokenRequestUrl = String.format("%s?grant_type=authorization_code&code=%s&client_id=%s&client_secret=%s", 
                tokenUrl, code, clientId, clientSecret);

        // Exchange the authorization code for an access token
        String response = restTemplate.postForObject(tokenRequestUrl, null, String.class);

        // Parse the response to extract the token
        // Note: You should use a proper JSON library to parse the response
        // This example assumes a simple JSON response with a field `access_token`
        // For real applications, use a JSON library like Jackson or Gson
        // Example:
        // JSONObject json = new JSONObject(response);
        // return json.getString("access_token");

        // For demonstration, return the raw response
        return response;
    }
    
    @Override
    public String getUserInfo(String accessToken) {
        // Create headers with the access token
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        // Create the HttpEntity with headers
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Make the request to Google's userinfo endpoint
        ResponseEntity<String> response = restTemplate.exchange(
                userinfoUrl,
                HttpMethod.GET,
                entity,
                String.class
        );

        // Return the user info
        return response.getBody();
    }

}
