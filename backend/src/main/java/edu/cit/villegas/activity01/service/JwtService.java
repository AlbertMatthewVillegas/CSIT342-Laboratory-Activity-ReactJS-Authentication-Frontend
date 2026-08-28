package edu.cit.villegas.activity01.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {
	private final SecretKey signingKey;

	public JwtService(@Value("${jwt.secret}") String secret) {
		this.signingKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
	}

	public String generateToken(String id) {
		return Jwts.builder()
				.subject(id)
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + 86_400_000))
				.signWith(signingKey)
				.compact();
	}

	public String extractSubject(String token) {
		return Jwts.parser().verifyWith(signingKey).build()
				.parseSignedClaims(token).getPayload().getSubject();
	}

	public boolean isValid(String token) {
		try {
			extractSubject(token);
			return true;
		} catch (RuntimeException exception) {
			return false;
		}
	}
}
