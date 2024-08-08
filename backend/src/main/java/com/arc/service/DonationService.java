package com.arc.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arc.dto.DonationDTO;
import com.arc.exception.DonationNotFoundException;

@Service
@Transactional
public interface DonationService {

	List<DonationDTO> getAllDonations() throws DonationNotFoundException;

	DonationDTO getDonation(Long id) throws DonationNotFoundException;

	DonationDTO addNewDonation(DonationDTO donationDTO);

	DonationDTO updateDonation(Long id, DonationDTO donationDTO) throws DonationNotFoundException;

	void deleteDonation(Long id);
	
	
}
