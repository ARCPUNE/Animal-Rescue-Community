package com.arc.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.arc.dto.ExpenseDTO;
import com.arc.service.ExpenseService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/expenses")
public class ExpensesController {

	private final ExpenseService expenseService;
	private final ObjectMapper mapper;
	
	@GetMapping
	public ResponseEntity<?> getAllExpenses() {
		return ResponseEntity.status(HttpStatus.OK).body(expenseService.getAllExpenses());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getExpense(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(expenseService.getExpense(id));
	}
	
	@PostMapping
	public ResponseEntity<?> addNewExpense(@RequestPart String expenseDTO, @RequestPart MultipartFile file) throws IOException {		
		ExpenseDTO dto = mapper.readValue(expenseDTO, ExpenseDTO.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(expenseService.addNewExpense(dto,file));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateExpense(@PathVariable Long id, @RequestPart String expenseDTO, @Nullable @RequestPart MultipartFile file) throws IOException {		
		ExpenseDTO dto = mapper.readValue(expenseDTO, ExpenseDTO.class);
		if(file != null && file.isEmpty()) file = null;
		return ResponseEntity.status(HttpStatus.OK).body(expenseService.updateExpense(id, dto,file));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteExpense(@PathVariable Long id) throws IOException {
		expenseService.deleteExpense(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted Successfully");
	}
	
}
