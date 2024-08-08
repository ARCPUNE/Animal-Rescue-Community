package com.arc.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arc.dto.AnimalDTO;

@Service
@Transactional
public interface AnimalService {
	
	public List<AnimalDTO> getAllAnimals();

	AnimalDTO getAnimal(Long id);

	AnimalDTO addNewAnimal(AnimalDTO animalDTO);

	AnimalDTO updateAnimal(Long id, AnimalDTO animalDTO);

	void deleteAnimal(Long id);
	
	
}
