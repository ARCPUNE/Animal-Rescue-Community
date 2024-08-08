package com.arc.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arc.dto.ExpenseDTO;
import com.arc.entities.Expense;
import com.arc.exception.ExpenseNotFoundException;
import com.arc.repository.ExpenseRepository;
import com.arc.service.ExpenseService;

@Service
public class ExpenseServiceImpl implements ExpenseService {
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private ExpenseRepository expenseRepository;
	
	@Override
	public List<ExpenseDTO> getAllExpenses() {
		
		// Check if expenses are available
		if(expenseRepository.count() > 0) {
			
			return expenseRepository.findAll() // Get all expense entities from DB
					.stream() // Convert Expense list to stream
					.map(entity-> // map every expense
						mapper.map(entity, ExpenseDTO.class) // Convert expense entity to expense DTO
						).toList(); // Convert Stream back to list
		}
		throw new ExpenseNotFoundException("No Expense Available");
	}

	@Override
	public ExpenseDTO getExpense(Long id) {
		
		// Check if id is not null and expense with specified id exists
		if (id != null && expenseRepository.existsById(id)) {
			
			// Get expense from Repository
			Expense expense = expenseRepository.findById(id).orElseThrow(()->new ExpenseNotFoundException("Expense with id "+ id + " do not exist"));
			
			//  map expense to ExpenseDTO and return it
			return mapper.map(expense, ExpenseDTO.class);			
		}
		throw new ExpenseNotFoundException("Expense with id "+ id + " do not exist");
	}
	
	@Override
	public ExpenseDTO addNewExpense(ExpenseDTO expenseDTO) {
			
		return mapper.map(
			expenseRepository.save(
					mapper.map(expenseDTO, Expense.class) // Map expenseDTO to expense and save it in DB
					), ExpenseDTO.class); // map the saved expense entity to expenseDTO and return it
	}
	
	@Override
	public ExpenseDTO updateExpense(Long id, ExpenseDTO expenseDTO) {
		
		// Check if id is not null and expense with specified id exists
		if (id == null || !expenseRepository.existsById(id)) {
			throw new ExpenseNotFoundException("Expense with id "+ id + " do not exist");
		}
		
		// Get Expense from Repository
		Expense expense = expenseRepository.findById(id).orElseThrow(()->new ExpenseNotFoundException("Expense with id "+ id + " do not exist"));
	
		// Update Expense details
		mapper.map(expenseDTO,expense);
		
		// save expense in database and map the returned expense entity to expenseDTO 
		return mapper.map(expenseRepository.save(expense), ExpenseDTO.class);
	}
	
	@Override
	public void deleteExpense(Long id) {
		
		// Check if id is not null
		if (id != null) {
			expenseRepository.deleteById(id);
		}
	}
	
}
