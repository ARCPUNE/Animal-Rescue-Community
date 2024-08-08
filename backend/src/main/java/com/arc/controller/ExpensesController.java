package com.arc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arc.dto.ExpenseDTO;
import com.arc.service.ExpenseService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/expenses")
public class ExpensesController {

	@Autowired
	private ExpenseService expenseService;
	
	@GetMapping
	public ResponseEntity<?> getAllExpenses() {
		return ResponseEntity.status(HttpStatus.OK).body(expenseService.getAllExpenses());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getExpense(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(expenseService.getExpense(id));
	}
	
	@PostMapping
	public ResponseEntity<?> addNewExpense(@RequestBody ExpenseDTO expenseDTO) {		
		return ResponseEntity.status(HttpStatus.CREATED).body(expenseService.addNewExpense(expenseDTO));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateExpense(@PathVariable Long id, @RequestBody ExpenseDTO expenseDTO) {		
		return ResponseEntity.status(HttpStatus.OK).body(expenseService.updateExpense(id, expenseDTO));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteExpense(@PathVariable Long id) {
		expenseService.deleteExpense(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted Successfully");
	}
	
}
