package com.arc.service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.arc.dto.DonationDTO;
import com.arc.entities.Donation;
import com.arc.entities.Donation.PaymentMethod;
import com.arc.exception.DonationNotFoundException;
import com.arc.repository.DonationRepository;
import com.arc.service.DonationService;
import com.arc.service.FileService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DonationServiceImpl implements DonationService {

	@Value("${project.img.donations}")
	private String path;

	@Value("${backend.url}")
	private String backendURL;

	private final ModelMapper mapper;
	private final FileService fileService;
	private final DonationRepository donationRepository;

	@Override
	public List<DonationDTO> getAllDonations() throws DonationNotFoundException {

		// Check if donations are available
		if (donationRepository.count() > 0) {

			return donationRepository.findAllDonationsWithUsers() // Get all donation entities from DB
					.stream() // Convert donation list to stream
					.map(entity -> {
						DonationDTO donationDTO = mapper.map(entity, DonationDTO.class);
						String photoUrl = backendURL + "/"+path + donationDTO.getDonationProof();
						donationDTO.setDonationProofURL(photoUrl);
						return donationDTO;
					}).toList(); // Convert Stream back to list
		}
		throw new DonationNotFoundException("No Donations Available");
	}

	@Override
	public DonationDTO getDonation(Long id) throws DonationNotFoundException {
		// Get donation from Repository
		Donation donation = donationRepository.findById(id)
				.orElseThrow(() -> new DonationNotFoundException("Donation with id " + id + " do not exist"));

		// map donation to DonationDTO and return it
		DonationDTO donationDTO = mapper.map(donation, DonationDTO.class);

		String photoUrl = backendURL + "/"+path + donationDTO.getDonationProof();
		donationDTO.setDonationProofURL(photoUrl);
		return donationDTO;
	}

	@Override
	public DonationDTO addNewDonation(DonationDTO donationDTO, MultipartFile file) throws IOException {
		String uploadedFileName = null;
	    if (file != null) {
	        uploadedFileName = fileService.uploadFile(path, file);
	    }
	    
	    // Set default values
	    donationDTO.setPaymentMethod(PaymentMethod.UPI);
	    donationDTO.setDate(new Date(System.currentTimeMillis()));
	    donationDTO.setDonationProof(uploadedFileName);
	    
	    // Save the updated donation
	    Donation donation = donationRepository.save(mapper.map(donationDTO, Donation.class));

	    String photoUrl = null;
	    if (file != null) {
	        photoUrl = backendURL + "/" + path + donationDTO.getDonationProof();
	    }

	    donationDTO = mapper.map(donation, DonationDTO.class);
	    donationDTO.setDonationProofURL(photoUrl);
	    return donationDTO;
	}

	@Override
	public DonationDTO updateDonation(Long id, DonationDTO donationDTO, MultipartFile file)
			throws IOException, DonationNotFoundException {

		// Get Donation from Repository
		Donation donation = donationRepository.findById(id)
				.orElseThrow(() -> new DonationNotFoundException("Donation with id " + id + " do not exist"));

		String fileName = donation.getDonationProof();
		
		if (file != null) {
			Files.deleteIfExists(Paths.get(path + File.separator + fileName));
			fileName = fileService.uploadFile(path, file);
		}
		
		donationDTO.setDonationProof(fileName);
		
		// Update Donation details
		mapper.map(donationDTO, donation);

		String photoUrl = backendURL + "/"+path + donationDTO.getDonationProof();

		donationDTO = mapper.map(donationRepository.save(donation), DonationDTO.class);
		donationDTO.setDonationProofURL(photoUrl);
		
		return donationDTO;
		}

	@Override
	public void deleteDonation(Long id) throws IOException {

		// Check if id is not null
		if (id != null) {
			Donation donation = donationRepository.findById(id)
					.orElseThrow(() -> new DonationNotFoundException("Donation with id " + id + " do not exist"));
			Files.deleteIfExists(Paths.get(path + File.separator + donation.getDonationProof()));
			donationRepository.deleteById(id);
		}
	}

}
