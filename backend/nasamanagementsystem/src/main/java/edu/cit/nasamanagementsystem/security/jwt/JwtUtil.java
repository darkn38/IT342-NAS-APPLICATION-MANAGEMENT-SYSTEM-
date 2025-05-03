package edu.cit.nasamanagementsystem.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKeyBase64;

    private final long REFRESH_TOKEN_VALIDITY = 1000 * 60 * 60 * 24; // 24 hours
    private final long ACCESS_TOKEN_VALIDITY = 1000 * 60 * 60;       // 1 hour

    @PostConstruct
    public void init() {
        if (secretKeyBase64 == null || secretKeyBase64.isEmpty()) {
            throw new IllegalArgumentException("JWT secret key is not set.");
        }
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(java.util.Base64.getDecoder().decode(secretKeyBase64));
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(UserDetails userDetails, Long userId) {
        Map<String, Object> claims = new HashMap<>();

        // ✅ Set user role as "ADMIN", "STUDENT", etc. from authorities
        String role = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority) // e.g. "ROLE_ADMIN"
                .findFirst()
                .orElse("ROLE_USER")
                .replace("ROLE_", ""); // → "ADMIN"

        claims.put("role", role); // ✅ This is needed by JwtFilter
        claims.put("userID", userId);

        return createToken(claims, userDetails.getUsername(), ACCESS_TOKEN_VALIDITY);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return createToken(new HashMap<>(), userDetails.getUsername(), REFRESH_TOKEN_VALIDITY);
    }

    private String createToken(Map<String, Object> claims, String subject, long validity) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + validity))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    // ✅ Extracts the "role" claim (e.g., "ADMIN") for JwtFilter
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }
}
