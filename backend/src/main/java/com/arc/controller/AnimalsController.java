package com.arc.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.arc.dto.AnimalDTO;
import com.arc.entities.Category;
import com.arc.service.AnimalService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/animals")
public class AnimalsController {

	private final AnimalService animalService;
	private final ObjectMapper mapper;

	@GetMapping
	public ResponseEntity<?> getAllAnimals() {
		return ResponseEntity.status(HttpStatus.OK).body(animalService.getAllAnimals());
	}
	
	@GetMapping("/category/{pet}")
	public ResponseEntity<?> getPetByType(@PathVariable Category pet) {
		return ResponseEntity.status(HttpStatus.OK).body(animalService.getPetByType(pet));
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getAnimal(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(animalService.getAnimal(id));
	}
	
	@PostMapping
	public ResponseEntity<?> addNewAnimal(@RequestPart String animalDTO, @RequestPart MultipartFile file) throws IOException {
		
		AnimalDTO dto = mapper.readValue(animalDTO, AnimalDTO.class);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(animalService.addNewAnimal(dto,file));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateAnimal(@PathVariable Long id, @RequestPart String animalDTO,@Nullable MultipartFile file) throws IOException {		
		AnimalDTO dto = mapper.readValue(animalDTO, AnimalDTO.class);
		if(file != null && file.isEmpty()) file = null;
		return ResponseEntity.status(HttpStatus.OK).body(animalService.updateAnimal(id, dto,file));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteAnimal(@PathVariable Long id) throws IOException {
		animalService.deleteAnimal(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted Successfully");
	}
	
}
