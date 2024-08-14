package com.arc.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.arc.dto.ExpenseDTO;

@Service
@Transactional
public interface ExpenseService {

	List<ExpenseDTO> getAllExpenses();

	ExpenseDTO getExpense(Long id);

	ExpenseDTO addNewExpense(ExpenseDTO expenseDTO, MultipartFile file) throws IOException;

	ExpenseDTO updateExpense(Long id, ExpenseDTO expenseDTO, MultipartFile file) throws IOException;

	void deleteExpense(Long id) throws IOException;

}
