package com.arc.entities;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiResponse {
	
	private String message;
	private LocalDateTime ts;
	
	public ApiResponse(String message){
		this.message = message;
		this.ts = LocalDateTime.now();
	}

}
