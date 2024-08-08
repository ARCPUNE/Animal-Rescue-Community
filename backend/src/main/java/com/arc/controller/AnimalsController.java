package com.arc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arc.dto.AnimalDTO;
import com.arc.service.AnimalService;

@RestController
@RequestMapping("/api/animals")
public class AnimalsController {

	@Autowired
	private AnimalService animalService;

	@GetMapping
	public ResponseEntity<?> getAllAnimals() {
		return ResponseEntity.status(HttpStatus.OK).body(animalService.getAllAnimals());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getAnimal(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(animalService.getAnimal(id));
	}
	
	@PostMapping
	public ResponseEntity<?> addNewAnimal(@RequestBody AnimalDTO animalDTO) {		
		return ResponseEntity.status(HttpStatus.CREATED).body(animalService.addNewAnimal(animalDTO));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateAnimal(@PathVariable Long id, @RequestBody AnimalDTO animalDTO) {		
		return ResponseEntity.status(HttpStatus.OK).body(animalService.updateAnimal(id, animalDTO));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteAnimal(@PathVariable Long id) {
		animalService.deleteAnimal(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted Successfully");
	}
	
}
