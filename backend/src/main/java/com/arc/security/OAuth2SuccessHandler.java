package com.arc.security;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.arc.entities.Role;
import com.arc.entities.User;
import com.arc.repository.UserRepository;
import com.arc.security.jwt.JwtService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

	@Value("${frontend.url}")
	private String frontendURL;

	private final UserRepository userRepository;
	private final JwtService jwtService;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws ServletException, IOException {
		log.info("success handler");
		OAuth2AuthenticationToken authenticationToken = (OAuth2AuthenticationToken) authentication;
		String authorizedClient = authenticationToken.getAuthorizedClientRegistrationId();

		handleOAuth2Login(authenticationToken, authorizedClient);

		this.setAlwaysUseDefaultTargetUrl(false); // Not mandatory as this is the default behavior
		this.setDefaultTargetUrl("/"); // Fallback URL in case there is no saved request

		@SuppressWarnings("null")
		String email = ((DefaultOAuth2User) authentication.getPrincipal()).getAttribute("email").toString();

		User user = userRepository.findByEmail(email).orElseThrow();

		String token = jwtService.generateToken(user);
		String refreshToken = jwtService.generateRefreshToken(new HashMap<String, Object>() , user);

		response.sendRedirect(frontendURL + "/home?token=" + token+ "&refreshToken=" + refreshToken);

		super.onAuthenticationSuccess(request, response, authentication);
	}

	/**
	 * Handles the OAuth2 login process for different providers.
	 *
	 * @param authenticationToken The authentication token containing user details.
	 * @param authorizedClient    The name of the OAuth2 provider
	 */
	public void handleOAuth2Login(OAuth2AuthenticationToken authenticationToken, String authorizedClient) {

		// Get the authenticated user's attributes
		DefaultOAuth2User principal = (DefaultOAuth2User) authenticationToken.getPrincipal();
		Map<String, Object> attributes = principal.getAttributes();
		log.info(attributes.toString());
		String email = attributes.get("email").toString(); // Retrieve the user's email
		String name = attributes.getOrDefault("name", "").toString(); // Retrieve the user's name

		// Check if the user already exists in the database
		userRepository.findByEmail(email).ifPresentOrElse(user -> {
			// Authenticate existing user
			authenticateExistingUser(user, attributes, authorizedClient);
		}, () -> {
			// Create and authenticate a new user if not found
			createAndAuthenticateNewUser(name, email, authorizedClient, attributes);
		});
	}

	/**
	 * Authenticates an existing user by setting up the security context.
	 *
	 * @param user             The existing user.
	 * @param attributes       The attributes of the authenticated user.
	 * @param authorizedClient The OAuth2 provider (e.g., "github" or "google").
	 */
	public void authenticateExistingUser(User user, Map<String, Object> attributes, String authorizedClient) {

		// Set the user's authorities based on their role
		Collection<? extends GrantedAuthority> authorities = user.getAuthorities();

		// Create an OAuth2 user with the authorities
		DefaultOAuth2User existingUser = new DefaultOAuth2User(authorities, attributes, "name");

		// Set the authentication in the security context
		Authentication securityAuth = new OAuth2AuthenticationToken(existingUser, authorities, authorizedClient);
		SecurityContextHolder.getContext().setAuthentication(securityAuth);
	}

	/**
	 * Creates and authenticates a new user.
	 *
	 * @param name             The name of the new user.
	 * @param email            The email of the new user.
	 * @param authorizedClient The OAuth2 provider
	 * @param attributes       The attributes of the authenticated user.
	 */
	public void createAndAuthenticateNewUser(String name, String email, String authorizedClient,
			Map<String, Object> attributes) {
		// Create a new user entity
		User newUser = new User(null, name, email, (new BCryptPasswordEncoder()).encode(authorizedClient), null,
				Role.ROLE_Volunteer, null, null);

		// Authenticate new user
		authenticateExistingUser(newUser, attributes, authorizedClient);

		// Save the new user to the database
		userRepository.save(newUser);

	}
}
