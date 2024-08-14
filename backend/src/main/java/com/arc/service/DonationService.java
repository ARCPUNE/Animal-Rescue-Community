package com.arc.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.arc.dto.DonationDTO;
import com.arc.exception.DonationNotFoundException;

@Service
@Transactional
public interface DonationService {

	List<DonationDTO> getAllDonations() throws DonationNotFoundException;

	DonationDTO getDonation(Long id) throws DonationNotFoundException;

	DonationDTO addNewDonation(DonationDTO donationDTO, MultipartFile file) throws IOException;

	DonationDTO updateDonation(Long id, DonationDTO donationDTO, MultipartFile file) throws IOException, DonationNotFoundException;

	void deleteDonation(Long id) throws IOException;
	
	
}
