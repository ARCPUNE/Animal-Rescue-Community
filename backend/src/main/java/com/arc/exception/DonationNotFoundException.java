package com.arc.exception;

public class DonationNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public DonationNotFoundException(String message) {
		super(message);
	}

}
