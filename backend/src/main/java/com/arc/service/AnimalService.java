package com.arc.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.arc.dto.AnimalDTO;
import com.arc.entities.Category;

@Service
@Transactional
public interface AnimalService {
	
	public List<AnimalDTO> getAllAnimals();

	AnimalDTO getAnimal(Long id);

	AnimalDTO addNewAnimal(AnimalDTO animalDTO, MultipartFile file) throws IOException;

	AnimalDTO updateAnimal(Long id, AnimalDTO animalDTO, MultipartFile file) throws IOException;

	void deleteAnimal(Long id) throws IOException;

	List<AnimalDTO> getPetByType(Category pet);
	
	
}
