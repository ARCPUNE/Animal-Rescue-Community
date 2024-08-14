package com.arc.exc_handler;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.arc.dto.ApiResponse;
import com.arc.exception.EmailSendingException;
import com.arc.exception.InvalidException;
import com.arc.exception.InvalidPasswordException;
import com.arc.exception.NotFoundException;
import com.arc.exception.UserAlreadyExistsException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
		List<FieldError> fieldErrors = ex.getFieldErrors();
		Map<String,String> map = fieldErrors.stream().collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
	}
	
	@ExceptionHandler(NotFoundException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public ApiResponse handleNotFoundException(NotFoundException ex) {
		return new ApiResponse(ex.getMessage());
	}
	
	@ExceptionHandler(UserAlreadyExistsException.class)
	@ResponseStatus(value = HttpStatus.CONFLICT)
	public ApiResponse handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
		return new ApiResponse(ex.getMessage());
	}
	
	@ExceptionHandler(BadCredentialsException.class)
	@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
	public ApiResponse handleBadCredentialsException() {
		return new ApiResponse( "Credentials Invalid !!");
	}
	
	@ExceptionHandler(InvalidException.class)
	@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
	public ApiResponse handleInvalidException(InvalidException ex) {
		return new ApiResponse(ex.getMessage());
	}
	
	@ExceptionHandler(EmailSendingException.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public ApiResponse handleEmailSendingException(EmailSendingException ex) {
		return new ApiResponse(ex.getMessage());
	}
	
	@ExceptionHandler(InvalidPasswordException.class)
	@ResponseStatus(value = HttpStatus.EXPECTATION_FAILED)
	public ApiResponse handleInvalidPasswordException(InvalidPasswordException ex) {
		return new ApiResponse(ex.getMessage());
	}
	
	@ExceptionHandler(RuntimeException.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public ApiResponse handleRuntimeException(RuntimeException ex) {
		return new ApiResponse(ex.getMessage());
	}
	
	
	
	
}
