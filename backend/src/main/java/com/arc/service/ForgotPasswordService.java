package com.arc.service;

import com.arc.dto.ChangePassword;

public interface ForgotPasswordService {

	void sendVerifyEmail(String token);

	void verifyOTP(Integer otp, String email);

	void changePassword(String email, ChangePassword changePassword);

}
