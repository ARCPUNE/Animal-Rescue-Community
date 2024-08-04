package com.arc.dto;

import com.arc.entities.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @NoArgsConstructor @ToString
public class UserDTO {

	@NotBlank(message = "Name Cannot be Blank")
	private String name;
	
	@NotBlank(message = "Email Cannot be Blank")
	private String email;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	
	@NotBlank(message = "Phone cannot be Blank")
	private String phoneNo;
	
	@NotNull
	private Role role;
	
	@NotBlank(message = "Address Cannot be Blank")
	private String address;
	
}
