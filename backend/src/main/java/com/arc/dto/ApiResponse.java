package com.arc.dto;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiResponse {
	
	private String message;
	private Date ts;
	
	public ApiResponse(String message){
		this.message = message;
		this.ts = new Date(System.currentTimeMillis());
	}

}
