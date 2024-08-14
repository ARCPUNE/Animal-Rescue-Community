package com.arc.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arc.dto.ApiResponse;
import com.arc.dto.ChangePassword;
import com.arc.service.ForgotPasswordService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/forgot")
@RequiredArgsConstructor
public class ForgotPasswordController {
	
	private final ForgotPasswordService forgotPasswordService;
	
	@GetMapping("/verify-email/{email}")
	public ResponseEntity<?> sendVerifyEmail(@PathVariable String email) {
		
		forgotPasswordService.sendVerifyEmail(email);
		return ResponseEntity.ok(new ApiResponse("Email Sent Successfully"));
	}
	
	@PostMapping("/verify-otp/{email}/{otp}")
	public ResponseEntity<?> verifyOTP(@PathVariable Integer otp, 
			@PathVariable String email) {
		
		forgotPasswordService.verifyOTP(otp,email);
		return ResponseEntity.ok(new ApiResponse("OTP Verified"));
	}
	
	@PostMapping("/change-pass/{email}")
	public ResponseEntity<?> changePassword(@PathVariable String email,@RequestBody ChangePassword changePassword) {
		forgotPasswordService.changePassword(email,changePassword);
		return ResponseEntity.ok(new ApiResponse("Password Changed Successfully"));
	}
	
	
	

}
