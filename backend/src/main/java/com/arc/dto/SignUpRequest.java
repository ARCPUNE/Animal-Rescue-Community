package com.arc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {

	private String name;
	private String email;
	private String password;
	@JsonProperty(access = Access.READ_ONLY)
	private String phoneNo;
	
}
