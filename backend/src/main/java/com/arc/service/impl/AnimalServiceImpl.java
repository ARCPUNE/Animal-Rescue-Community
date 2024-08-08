package com.arc.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arc.dto.AnimalDTO;
import com.arc.entities.Animal;
import com.arc.exception.AnimalNotFoundException;
import com.arc.repository.AnimalRepository;
import com.arc.service.AnimalService;

@Service
public class AnimalServiceImpl implements AnimalService {
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private AnimalRepository animalRepository;
	
	@Override
	public List<AnimalDTO> getAllAnimals() {
		
		return animalRepository.findAll() // Get all animal entities from DB
				.stream() // Convert animal list to stream
				.map(entity-> // map every animal
					mapper.map(entity, AnimalDTO.class) // Convert animal entity to animal DTO
					).toList(); // Convert Stream back to list
	}
	
	@Override
	public AnimalDTO getAnimal(Long id) {

		// Check if id is not null and animal with specified id exists
		if (id != null && animalRepository.existsById(id)) {
			
			// Get animal from Repository
			Animal animal = animalRepository.findById(id).orElseThrow(()->new AnimalNotFoundException("Animal with id "+ id + " do not exist"));
			
			//  map animal to AnimalDTO and return it
			return mapper.map(animal, AnimalDTO.class);			
		}
		throw new AnimalNotFoundException("Animal with id "+ id + " do not exist");
	}

	@Override
	public AnimalDTO addNewAnimal(AnimalDTO animalDTO) {
		return mapper.map(
			animalRepository.save(
					mapper.map(animalDTO, Animal.class) // Map animalDTO to animal and save it in DB
					), AnimalDTO.class); // map the saved animal entity to animalDTO and return it

	}

	@Override
	public AnimalDTO updateAnimal(Long id, AnimalDTO animalDTO) {
		// Check if id is not null and animal with specified id exists
		if (id == null || !animalRepository.existsById(id)) {
			throw new AnimalNotFoundException("Animal with id "+ id + " do not exist");
		}
		
		// Get Animal from Repository
		Animal animal = animalRepository.findById(id).orElseThrow(()->new AnimalNotFoundException("Animal with id "+ id + " do not exist"));
	
		// Update Animal details
		mapper.map(animalDTO,animal);
		
		// save animal in database and map the returned animal entity to animalDTO 
		return mapper.map(animalRepository.save(animal), AnimalDTO.class);

	}

	@Override
	public void deleteAnimal(Long id) {
		// Check if id is not null
		if (id != null) {
			animalRepository.deleteById(id);
		}
	}
	
}
