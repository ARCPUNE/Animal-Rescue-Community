package com.arc.service.impl;

import java.util.Date;
import java.util.Objects;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.arc.dto.ChangePassword;
import com.arc.entities.ForgotPassword;
import com.arc.entities.User;
import com.arc.exception.EmailSendingException;
import com.arc.exception.InvalidPasswordException;
import com.arc.exception.OTPInvalidException;
import com.arc.exception.UserNotFoundException;
import com.arc.repository.ForgotPasswordRepository;
import com.arc.repository.UserRepository;
import com.arc.service.ForgotPasswordService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ForgotPasswordServiceImpl implements ForgotPasswordService {

	@Value("${spring.mail.username}")
	private String fromEmailId;

	private final JavaMailSender javaMailSender;
	private final TemplateEngine templateEngine;
	private final UserRepository userRepository;
	private final ForgotPasswordRepository forgotPasswordRepository;
	private final PasswordEncoder encoder;

	@Override
	public void sendVerifyEmail(String email) {

		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new UserNotFoundException("User with email " + email + " not found"));
		String name = user.getName();
		Integer otp = otpGenerator();
		
		ForgotPassword fp = ForgotPassword.builder()
				.otp(otp)
				.expirationTime(new Date(System.currentTimeMillis() + 1000 * 60 * 10))
				.user(user)
				.build();

		Context context = new Context();
		context.setVariable("otp", otp);
		context.setVariable("name", name);

		String body = templateEngine.process("email-template", context);

		try {
			MimeMessage message = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			helper.setFrom(fromEmailId);
			helper.setTo(email);
			helper.setText(body, true);
			helper.setSubject("OTP Code for ARC");
			javaMailSender.send(message);
			
			forgotPasswordRepository.save(fp);

		} catch (MessagingException e) {
			throw new EmailSendingException(e.getMessage());
		}
	}

	private Integer otpGenerator() {
		Random random = new Random();
		int randomNumber = 100000 + random.nextInt(900000);
		return randomNumber;
	}

	@Transactional
	@Override
	public void verifyOTP(Integer otp, String email) {
				
		User user = userRepository.findByEmail(email).orElseThrow();
		
		ForgotPassword fp = forgotPasswordRepository.findByOtpAndUser(otp, user)
		.orElseThrow(()-> new OTPInvalidException("Invalid OTP for email "+ email));
		
		if (fp.getExpirationTime().before( new Date(System.currentTimeMillis()))) {
			forgotPasswordRepository.deleteById(fp.getId());
			throw new OTPInvalidException("OTP has Expired");
		}
		fp.setVerified(true);
		forgotPasswordRepository.save(fp);
	}

	@Transactional
	@Override
	public void changePassword(String email,ChangePassword changePassword) {
		
		if (!Objects.equals(changePassword.password(), changePassword.rePassword())) {
			throw new InvalidPasswordException("Please enter password again");
		}
		
		User user = userRepository.findByEmail(email).orElseThrow();
		ForgotPassword fp = forgotPasswordRepository.findByUser(user).orElseThrow(() -> new OTPInvalidException("OTP not verified for email " + email));
		
		if (!fp.getVerified()) {
	        throw new OTPInvalidException("OTP not verified for email " + email);
	    }
		
		userRepository.updatePassword(email, encoder.encode(changePassword.password()));
		forgotPasswordRepository.deleteById(fp.getId());
	}

}
