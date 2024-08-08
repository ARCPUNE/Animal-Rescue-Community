package com.arc.entities;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "name", length = 50, nullable = false)
	private String name;

	@Column(name = "email", unique = true, length = 50, nullable = false)
	private String email;

	@Column(name = "password", length = 255, nullable = false)
	private String password;

	@Column(name = "phone_no", length = 10)
	private String phoneNo;

	@Enumerated(EnumType.STRING)
	@Column(name = "role", length = 10, nullable = false)
	private Role role;

	@Column(name = "address", length = 255)
	private String address;

	public List<? extends GrantedAuthority> getAuthorities() {
		// Convert roles to a collection of GrantedAuthority
		return List.of(new SimpleGrantedAuthority(role.toString()));
	}

}
