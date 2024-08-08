package com.arc.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arc.dto.AdoptionDTO;


@Service
@Transactional
public interface AdoptionService {

	List<AdoptionDTO> getAllAdoptions();

	AdoptionDTO getAdoption(Long id);

	AdoptionDTO addNewAdoption(AdoptionDTO adoptionDTO);

	AdoptionDTO updateAdoption(Long id, AdoptionDTO adoptionDTO);

	void deleteAdoption(Long id);
	
	
	
}
