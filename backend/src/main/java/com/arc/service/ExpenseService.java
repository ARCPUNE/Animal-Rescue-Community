package com.arc.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arc.repository.ExpenseRepository;

@Service
@Transactional
public class ExpenseService {
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private ExpenseRepository expenseRepository;
	
}