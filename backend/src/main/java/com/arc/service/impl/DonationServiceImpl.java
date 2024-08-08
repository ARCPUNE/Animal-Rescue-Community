package com.arc.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arc.dto.DonationDTO;
import com.arc.entities.Donation;
import com.arc.exception.DonationNotFoundException;
import com.arc.repository.DonationRepository;
import com.arc.service.DonationService;

@Service
public class DonationServiceImpl implements DonationService {
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private DonationRepository donationRepository;
	
	@Override
	public List<DonationDTO> getAllDonations() throws DonationNotFoundException{
		
		// Check if donations are available
		if(donationRepository.count() > 0) {

		return donationRepository.findAllDonationsWithUsers() // Get all donation entities from DB
			.stream() // Convert donation list to stream
			.map(entity-> // map every donation
				mapper.map(entity, DonationDTO.class) // Convert donation entity to donation DTO
				).toList(); // Convert Stream back to list
		}
			throw new DonationNotFoundException("No Donations Available");
	}

	@Override
	public DonationDTO getDonation(Long id) throws DonationNotFoundException{
		// Check if id is not null and donation with specified id exists
		if (id != null && donationRepository.existsById(id)) {
			
			// Get donation from Repository
			Donation donation = donationRepository.findById(id)
					.orElseThrow(()->new DonationNotFoundException("Donation with id "+ id + " do not exist"));
			
			//  map donation to DonationDTO and return it
			return mapper.map(donation, DonationDTO.class);			
		}
		throw new DonationNotFoundException("Donation with id "+ id + " do not exist");
	}

	@Override
	public DonationDTO addNewDonation(DonationDTO donationDTO) {
		
		return mapper.map(
			donationRepository.save(
					mapper.map(donationDTO, Donation.class) // Map donationDTO to donation and save it in DB
					), DonationDTO.class); // map the saved donation entity to donationDTO and return it
	}

	@Override
	public DonationDTO updateDonation(Long id, DonationDTO donationDTO) throws DonationNotFoundException {
		// Check if id is not null and donation with specified id exists
		if (id == null || !donationRepository.existsById(id)) {
			throw new DonationNotFoundException("Donation with id "+ id + " do not exist");
		}
		
		// Get Donation from Repository
		Donation donation = donationRepository.findById(id).orElseThrow(()->new DonationNotFoundException("Donation with id "+ id + " do not exist"));
	
		// Update Donation details
		mapper.map(donationDTO,donation);
		
		// save Donation in database and map the returned Donation entity to DonationDTO 
		return mapper.map(donationRepository.save(donation), DonationDTO.class);
	}

	@Override
	public void deleteDonation(Long id) {
		
		// Check if id is not null
		if (id != null) {
			donationRepository.deleteById(id);
		}		
	}
	
	
	
	
}
