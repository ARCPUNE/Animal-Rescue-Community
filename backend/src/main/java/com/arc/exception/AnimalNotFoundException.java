package com.arc.exception;

public class AnimalNotFoundException extends NotFoundException {

	private static final long serialVersionUID = 1L;

	public AnimalNotFoundException(String message) {
		super(message);
	}

}
