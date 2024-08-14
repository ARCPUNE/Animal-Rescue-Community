package com.arc.exception;

public class InvalidJWTTokenException extends InvalidException {

	private static final long serialVersionUID = 1L;

	public InvalidJWTTokenException(String message) {
		super(message);
	}
}
