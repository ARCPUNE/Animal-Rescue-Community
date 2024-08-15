package com.arc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arc.dto.UserDTO;
import com.arc.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UsersController {

	@Autowired
	private UserService userService;
	
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping
	public ResponseEntity<?> getAllUsers() {
		return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getUser(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(userService.getUser(id));
	}
	
	@GetMapping("/token")
	public ResponseEntity<?> getUser(@RequestHeader(value = "Authorization") String token) {
		return ResponseEntity.status(HttpStatus.OK).body(userService.getUser(token));
	}
	
	@PreAuthorize("permitAll()")
	@PostMapping
	public ResponseEntity<?> addNewUser(@Valid @RequestBody UserDTO userDTO) {
		return ResponseEntity.status(HttpStatus.OK).body(userService.addNewUser(userDTO)); 
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Long id,@Valid @RequestBody UserDTO userDTO) {
		return ResponseEntity.status(HttpStatus.OK).body(userService.updateUser(id,userDTO));
	}
}
