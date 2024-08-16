package com.arc.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.arc.dto.AdoptionDTO;


@Service
@Transactional
public interface AdoptionService {

	List<AdoptionDTO> getAllAdoptions();

	AdoptionDTO getAdoption(Long id);

	AdoptionDTO addNewAdoption(AdoptionDTO adoptionDTO, MultipartFile file) throws IOException;

	AdoptionDTO updateAdoption(Long id, AdoptionDTO adoptionDTO, MultipartFile file) throws IOException;

	void deleteAdoption(Long id)throws IOException;
	
	
	
}
