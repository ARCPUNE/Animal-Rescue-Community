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

import com.arc.dto.DonationDTO;
import com.arc.service.DonationService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/donations")
public class DonationsController {

	private final DonationService donationService;
	private final ObjectMapper mapper;

	@GetMapping
	public ResponseEntity<?> getAllDonations() {
		return ResponseEntity.status(HttpStatus.OK).body(donationService.getAllDonations());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getDonation(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(donationService.getDonation(id));
	}

	@PostMapping
	public ResponseEntity<?> addNewDonation(@RequestPart String donationDTO,@Nullable @RequestPart MultipartFile file) throws IOException {
		DonationDTO dto = mapper.readValue(donationDTO, DonationDTO.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(donationService.addNewDonation(dto,file));
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateDonation(@PathVariable Long id, @RequestPart String donationDTO,@Nullable MultipartFile file) throws IOException {
		DonationDTO dto = mapper.readValue(donationDTO, DonationDTO.class);
		if(file != null && file.isEmpty()) file = null;
		return ResponseEntity.status(HttpStatus.OK).body(donationService.updateDonation(id, dto,file));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteDonation(@PathVariable Long id) throws IOException {
		donationService.deleteDonation(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted Successfully");
	}

}
