package com.arc.dto;

import com.arc.entities.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
	
	private Long id;

	@NotBlank(message = "Name Cannot be Blank")
	private String name;
	
	@NotBlank(message = "Email Cannot be Blank")
	@Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",message = "Invalid Email Address")
	private String email;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	
	private String phoneNo;
	
	private Role role;
	
	@NotBlank(message = "Address Cannot be Blank")
	private String address;
	
}
