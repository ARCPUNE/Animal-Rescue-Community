package com.arc.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
	
	@GetMapping
	public ResponseEntity<?> name() {
		
		return ResponseEntity.ok("<h1>Home</h1>");
	}
		
}
