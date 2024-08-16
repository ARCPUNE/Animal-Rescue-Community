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

import com.arc.dto.AdoptionDTO;
import com.arc.service.AdoptionService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/adoptions")
@RequiredArgsConstructor
public class AdoptionsController {

	private final AdoptionService adoptionService;
	private final ObjectMapper mapper;
	
	@GetMapping
	public ResponseEntity<?> getAllAdoptions() {
		return ResponseEntity.status(HttpStatus.OK).body(adoptionService.getAllAdoptions());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getAdoption(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(adoptionService.getAdoption(id));
	}
	
	@PostMapping
	public ResponseEntity<?> addNewAdoption(@RequestPart String adoptionDTO, @RequestPart MultipartFile file) throws IOException {	
		AdoptionDTO dto = mapper.readValue(adoptionDTO, AdoptionDTO.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(adoptionService.addNewAdoption(dto,file));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateAdoption(@PathVariable Long id, @RequestPart String adoptionDTO,@Nullable @RequestPart MultipartFile file) throws IOException {	
		AdoptionDTO dto = mapper.readValue(adoptionDTO, AdoptionDTO.class);
		if(file != null && file.isEmpty()) file = null;
		return ResponseEntity.status(HttpStatus.OK).body(adoptionService.updateAdoption(id, dto,file));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteAdoption(@PathVariable Long id) throws IOException {
		adoptionService.deleteAdoption(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted Successfully");
	}
}
