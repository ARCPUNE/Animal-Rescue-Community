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

import com.arc.dto.AdoptionDTO;
import com.arc.service.AdoptionService;

@RestController
@RequestMapping("/adoptions")
public class AdoptionsController {

	@Autowired
	private AdoptionService adoptionService;
	
	@GetMapping
	public ResponseEntity<?> getAllAdoptions() {
		return ResponseEntity.status(HttpStatus.OK).body(adoptionService.getAllAdoptions());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getAdoption(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(adoptionService.getAdoption(id));
	}
	
	@PostMapping
	public ResponseEntity<?> addNewAdoption(@RequestBody AdoptionDTO adoptionDTO) {		
		return ResponseEntity.status(HttpStatus.CREATED).body(adoptionService.addNewAdoption(adoptionDTO));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateAdoption(@PathVariable Long id, @RequestBody AdoptionDTO adoptionDTO) {		
		return ResponseEntity.status(HttpStatus.OK).body(adoptionService.updateAdoption(id, adoptionDTO));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteAdoption(@PathVariable Long id) {
		adoptionService.deleteAdoption(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted Successfully");
	}
}
