package com.arc.exception;

public class UserNotFoundException extends NotFoundException {
	private static final long serialVersionUID = 1L;

	public UserNotFoundException(String message) {
		super(message);
	}
}
