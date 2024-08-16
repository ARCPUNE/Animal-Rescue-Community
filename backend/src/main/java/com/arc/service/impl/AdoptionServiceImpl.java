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

import com.arc.dto.AdoptionDTO;
import com.arc.entities.Adoption;
import com.arc.exception.AdoptionNotFoundException;
import com.arc.repository.AdoptionRepository;
import com.arc.service.AdoptionService;
import com.arc.service.FileService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdoptionServiceImpl implements AdoptionService {
	
	@Value("${project.img.adoptions}")
	private String path;

	@Value("${backend.url}")
	private String backendURL;

	private final ModelMapper mapper;
	private final FileService fileService;
	private final AdoptionRepository adoptionRepository;
	
	@Override
	public List<AdoptionDTO> getAllAdoptions() {

		return adoptionRepository.findAllAdoptionsWithAnimalAndUser() // Get all adoption entities from DB
				.stream() // Convert adoption list to stream
				.map(entity-> {
					AdoptionDTO adoptionDTO = mapper.map(entity, AdoptionDTO.class);
					String photoUrl = backendURL + "/"+path + adoptionDTO.getGovtIdPhoto();
					adoptionDTO.setGovtIdPhotoURL(photoUrl);
					return adoptionDTO;
				}).toList(); // Convert Stream back to list
	}

	@Override
	public AdoptionDTO getAdoption(Long id) {

		// Get adoption from Repository
			Adoption adoption = adoptionRepository.findById(id).orElseThrow(()->new AdoptionNotFoundException("Adoption with id "+ id + " do not exist"));
			
			//  map adoption to AdoptionDTO and return it
			AdoptionDTO adoptionDTO = mapper.map(adoption, AdoptionDTO.class);
			String photoUrl = backendURL + "/"+path + adoptionDTO.getGovtIdPhoto();
			adoptionDTO.setGovtIdPhotoURL(photoUrl);
			return adoptionDTO;		
	}

	@Override
	public AdoptionDTO addNewAdoption(AdoptionDTO adoptionDTO, MultipartFile file) throws IOException {
		String uploadedFileName = fileService.uploadFile(path, file);
		adoptionDTO.setAdoptionDate(new Date(System.currentTimeMillis()));
		adoptionDTO.setGovtIdPhoto(uploadedFileName);
		
		
		Adoption adoption = adoptionRepository.save(mapper.map(adoptionDTO, Adoption.class));

		String photoUrl = backendURL + "/"+path + adoptionDTO.getGovtIdPhoto();

		adoptionDTO = mapper.map(adoption, AdoptionDTO.class);
		adoptionDTO.setGovtIdPhotoURL(photoUrl);
		return adoptionDTO;
	}

	@Override
	public AdoptionDTO updateAdoption(Long id, AdoptionDTO adoptionDTO, MultipartFile file) throws IOException {
		
		// Get Adoption from Repository
		Adoption adoption = adoptionRepository.findById(id).orElseThrow(()->new AdoptionNotFoundException("Adoption with id "+ id + " do not exist"));
	
String fileName = adoption.getGovtIdPhoto();
		
		if (file != null) {
			Files.deleteIfExists(Paths.get(path + File.separator + fileName));
			fileName = fileService.uploadFile(path, file);
		}
		
		adoptionDTO.setGovtIdPhoto(fileName);
		
		// Update Adoption details
		mapper.map(adoptionDTO,adoption);
		
		// save adoption in database and map the returned adoption entity to adoptionDTO 
		String photoUrl = backendURL + "/"+path + adoptionDTO.getGovtIdPhoto();

		adoptionDTO = mapper.map(adoption, AdoptionDTO.class);
		adoptionDTO.setGovtIdPhotoURL(photoUrl);
		return adoptionDTO;

	}

	@Override
	public void deleteAdoption(Long id) throws IOException {
		// Check if id is not null
				if (id != null) {
					Adoption adoption = adoptionRepository.findById(id)
							.orElseThrow(() -> new AdoptionNotFoundException("Expense with id " + id + " do not exist"));
					Files.deleteIfExists(Paths.get(path + File.separator + adoption.getGovtIdPhoto()));
					
					adoptionRepository.deleteById(id);
				}
	}
	
}
