package com.arc.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arc.dto.AdoptionDTO;
import com.arc.entities.Adoption;
import com.arc.exception.AdoptionNotFoundException;
import com.arc.repository.AdoptionRepository;
import com.arc.service.AdoptionService;

@Service
public class AdoptionServiceImpl implements AdoptionService {
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private AdoptionRepository adoptionRepository;
	
	@Override
	public List<AdoptionDTO> getAllAdoptions() {

		return adoptionRepository.findAllAdoptionsWithAnimalAndUser() // Get all adoption entities from DB
				.stream() // Convert adoption list to stream
				.map(entity-> // map every adoption
					mapper.map(entity, AdoptionDTO.class) // Convert adoption entity to adoption DTO
					).toList(); // Convert Stream back to list
	}

	@Override
	public AdoptionDTO getAdoption(Long id) {

		// Check if id is not null and adoption with specified id exists
		if (id != null && adoptionRepository.existsById(id)) {
			
			// Get adoption from Repository
			Adoption adoption = adoptionRepository.findById(id).orElseThrow(()->new AdoptionNotFoundException("Adoption with id "+ id + " do not exist"));
			
			//  map adoption to AdoptionDTO and return it
			return mapper.map(adoption, AdoptionDTO.class);			
		}
		throw new AdoptionNotFoundException("Adoption with id "+ id + " do not exist");
	}

	@Override
	public AdoptionDTO addNewAdoption(AdoptionDTO adoptionDTO) {
		return mapper.map(
			adoptionRepository.save(
					mapper.map(adoptionDTO, Adoption.class) // Map adoptionDTO to adoption and save it in DB
					), AdoptionDTO.class); // map the saved adoption entity to adoptionDTO and return it

	}

	@Override
	public AdoptionDTO updateAdoption(Long id, AdoptionDTO adoptionDTO) {
		// Check if id is not null and adoption with specified id exists
		if (id == null || !adoptionRepository.existsById(id)) {
			throw new AdoptionNotFoundException("Adoption with id "+ id + " do not exist");
		}
		
		// Get Adoption from Repository
		Adoption adoption = adoptionRepository.findById(id).orElseThrow(()->new AdoptionNotFoundException("Adoption with id "+ id + " do not exist"));
	
		// Update Adoption details
		mapper.map(adoptionDTO,adoption);
		
		// save adoption in database and map the returned adoption entity to adoptionDTO 
		return mapper.map(adoptionRepository.save(adoption), AdoptionDTO.class);

	}

	@Override
	public void deleteAdoption(Long id) {
		// Check if id is not null
		if (id != null) {
			adoptionRepository.deleteById(id);
		}
	}
	
}
