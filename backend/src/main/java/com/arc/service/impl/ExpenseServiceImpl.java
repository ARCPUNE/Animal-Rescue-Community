package com.arc.service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.arc.dto.ExpenseDTO;
import com.arc.entities.Expense;
import com.arc.exception.ExpenseNotFoundException;
import com.arc.repository.ExpenseRepository;
import com.arc.service.ExpenseService;
import com.arc.service.FileService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

	@Value("${project.img.expenses}")
	private String path;

	@Value("${backend.url}")
	private String backendURL;

	private final ModelMapper mapper;
	private final FileService fileService;
	private final ExpenseRepository expenseRepository;

	@Override
	public List<ExpenseDTO> getAllExpenses() {

		// Check if expenses are available
		if (expenseRepository.count() > 0) {

			return expenseRepository.findAll() // Get all expense entities from DB
					.stream() // Convert Expense list to stream
					.map(entity -> {
						ExpenseDTO expenseDTO = mapper.map(entity, ExpenseDTO.class);
						String photoUrl = backendURL + "/"+path + expenseDTO.getExpenseProof();
						expenseDTO.setExpenseProofURL(photoUrl);
						return expenseDTO;
					}).toList(); // Convert Stream back to list
		}
		throw new ExpenseNotFoundException("No Expense Available");
	}

	@Override
	public ExpenseDTO getExpense(Long id) {

		// Get expense from Repository
		Expense expense = expenseRepository.findById(id)
				.orElseThrow(() -> new ExpenseNotFoundException("Expense with id " + id + " do not exist"));

		// map expense to ExpenseDTO and return it
		ExpenseDTO animalDTO = mapper.map(expense, ExpenseDTO.class);

		String photoUrl = backendURL + "/"+path + animalDTO.getExpenseProof();
		animalDTO.setExpenseProofURL(photoUrl);

		return animalDTO;
	}

	@Override
	public ExpenseDTO addNewExpense(ExpenseDTO expenseDTO, MultipartFile file) throws IOException {
		String uploadedFileName = fileService.uploadFile(path, file);

		expenseDTO.setExpenseProof(uploadedFileName);

		Expense expense = expenseRepository.save(mapper.map(expenseDTO, Expense.class));

		String photoUrl = backendURL + "/"+path + expenseDTO.getExpenseProof();

		expenseDTO = mapper.map(expense, ExpenseDTO.class);
		expenseDTO.setExpenseProofURL(photoUrl);
		return expenseDTO;

	}

	@Override
	public ExpenseDTO updateExpense(Long id, ExpenseDTO expenseDTO, MultipartFile file) throws IOException {

		// Get Expense from Repository
		Expense expense = expenseRepository.findById(id)
				.orElseThrow(() -> new ExpenseNotFoundException("Expense with id " + id + " do not exist"));

		String fileName = expense.getExpenseProof();
		
		if (file != null) {
			Files.deleteIfExists(Paths.get(path + File.separator + fileName));
			fileName = fileService.uploadFile(path, file);
		}
		
		expenseDTO.setExpenseProof(fileName);

		// Update Expense details
		mapper.map(expenseDTO, expense);

		// save expense in database and map the returned expense entity to expenseDTO
		String photoUrl = backendURL + "/"+path + expenseDTO.getExpenseProof();

		expenseDTO = mapper.map(expenseRepository.save(expense), ExpenseDTO.class);
		expenseDTO.setExpenseProofURL(photoUrl);
		return expenseDTO;
	}

	@Override
	public void deleteExpense(Long id) throws IOException {

		// Check if id is not null
		if (id != null) {
			Expense expense = expenseRepository.findById(id)
					.orElseThrow(() -> new ExpenseNotFoundException("Expense with id " + id + " do not exist"));
			Files.deleteIfExists(Paths.get(path + File.separator + expense.getExpenseProof()));
			
			expenseRepository.deleteById(id);
		}
	}

}
