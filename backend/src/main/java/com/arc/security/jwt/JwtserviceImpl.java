package com.arc.security.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtserviceImpl implements JwtService {
	
	@Value("${jwt.secret.key}")
	private String jwtSecretKey;

	@Override
	public String generateToken(UserDetails userDetails) {
		return Jwts.builder()
				   .subject(userDetails.getUsername())
				   .issuedAt(new Date(System.currentTimeMillis()))
				   .expiration(new Date(System.currentTimeMillis()+ 1000 * 60 * 60 * 24))
				   .signWith(getSignKey(),Jwts.SIG.HS256)
				   .compact();
	}
	
	public String generateToken(String email) {
		return Jwts.builder()
				   .subject(email)
				   .issuedAt(new Date(System.currentTimeMillis()))
				   .expiration(new Date(System.currentTimeMillis()+ 1000 * 60 * 60 * 24))
				   .signWith(getSignKey(),Jwts.SIG.HS256)
				   .compact();
	}
	
	@Override
	public String generateRefreshToken(HashMap<String, Object> extraClaims, UserDetails userDetails) {
		return Jwts.builder()
				   .claims(extraClaims)
				   .subject(userDetails.getUsername())
				   .issuedAt(new Date(System.currentTimeMillis()))
				   .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7))
				   .signWith(getSignKey(),Jwts.SIG.HS256)
				   .compact();
	}
	
	@Override
	public String extractUserName(String token) {
		return extractClaim(token, Claims::getSubject);
	}
	
	private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
		final Claims claims = extractAllClaims(token);
		return claimsResolvers.apply(claims);
	}
	
	
	private Claims extractAllClaims(String token) {
		return Jwts.parser()
				   .verifyWith(getSignKey())
				   .build()
				   .parseSignedClaims(token)
				   .getPayload();
	}

	private SecretKey getSignKey() {
		byte[] key = Decoders.BASE64.decode(jwtSecretKey);
		return Keys.hmacShaKeyFor(key);
	}
	
	@Override
	public boolean isTokenValid(String token, UserDetails userDetails) {
		final String username = extractUserName(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}

	private boolean isTokenExpired(String token) {
		return extractClaim(token, Claims::getExpiration).before(new Date(System.currentTimeMillis()));
	}

	public String invalidateToken(String token) {
		extractClaim(token, null);
		return null;
	}
	
	
}
