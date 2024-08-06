package com.arc.exception;

public class AdoptionNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public AdoptionNotFoundException(String message) {
		super(message);
	}

}
