package com.arc.service;

import org.springframework.stereotype.Service;

@Service
public interface OAuth2Service {

	String exchangeCodeForToken(String code);

	String getUserInfo(String accessToken);

    

}
