package com.arc.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @ToString
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Long id;
	
	@Column(name = "name", length = 50,nullable = false)
	private String name;
	
	@Column(name = "email" ,unique = true, length = 50, nullable = false)
	private String email;
	
	@Column(name = "password", length = 20, nullable = false)
	private String password;
	
	@Column(name = "phone_no", length = 10)
	private String phoneNo;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "role", length = 10, nullable = false)
	private Role role;
	
	@Column(name = "address", length = 255)
	private String address;
	
}
