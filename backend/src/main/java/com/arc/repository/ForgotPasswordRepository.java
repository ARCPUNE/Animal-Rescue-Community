package com.arc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arc.entities.ForgotPassword;
import com.arc.entities.User;


public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Long>{

	Optional<ForgotPassword> findByOtpAndUser(Integer otp, User user);

	Optional<ForgotPassword> findByUser(User user);
	
}
