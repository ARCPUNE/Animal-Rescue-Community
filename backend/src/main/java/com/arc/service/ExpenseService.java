package com.arc.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arc.dto.ExpenseDTO;

@Service
@Transactional
public interface ExpenseService {

	List<ExpenseDTO> getAllExpenses();

	ExpenseDTO getExpense(Long id);

	ExpenseDTO addNewExpense(ExpenseDTO expenseDTO);

	ExpenseDTO updateExpense(Long id, ExpenseDTO expenseDTO);

	void deleteExpense(Long id);
	
	
}
