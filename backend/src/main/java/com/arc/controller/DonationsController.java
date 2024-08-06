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

import com.arc.dto.DonationDTO;
import com.arc.service.DonationService;

@RestController
@RequestMapping("/donations")
public class DonationsController {

	@Autowired
	private DonationService donationService;

	@GetMapping
	public ResponseEntity<?> getAllDonations() {
		return ResponseEntity.status(HttpStatus.OK).body(donationService.getAllDonations());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getDonation(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(donationService.getDonation(id));
	}

	@PostMapping
	public ResponseEntity<?> addNewDonation(@RequestBody DonationDTO donationDTO) {
		return ResponseEntity.status(HttpStatus.CREATED).body(donationService.addNewDonation(donationDTO));
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateDonation(@PathVariable Long id, @RequestBody DonationDTO donationDTO) {
		return ResponseEntity.status(HttpStatus.OK).body(donationService.updateDonation(id, donationDTO));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteDonation(@PathVariable Long id) {
		donationService.deleteDonation(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted Successfully");
	}

}
