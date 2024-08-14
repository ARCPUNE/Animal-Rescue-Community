package com.arc.exception;

public class ExpenseNotFoundException extends NotFoundException {

	private static final long serialVersionUID = 1L;

	public ExpenseNotFoundException(String message) {
		super(message);
	}

}
