package com.arc.service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.arc.dto.AnimalDTO;
import com.arc.entities.Animal;
import com.arc.entities.Animal.Status;
import com.arc.entities.Category;
import com.arc.exception.AnimalNotFoundException;
import com.arc.repository.AnimalRepository;
import com.arc.service.AnimalService;
import com.arc.service.FileService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnimalServiceImpl implements AnimalService {

	@Value("${project.img.animals}")
	private String path;

	@Value("${backend.url}")
	private String backendURL;

	private final ModelMapper mapper;
	private final FileService fileService;
	private final AnimalRepository animalRepository;

	@Override
	public List<AnimalDTO> getAllAnimals() {

		return animalRepository.findAll() // Get all animal entities from DB
				.stream() // Convert animal list to stream
				.map(entity -> {
					AnimalDTO animalDTO = mapper.map(entity, AnimalDTO.class);
					String photoUrl = backendURL + "/"+path + animalDTO.getPhoto();
					animalDTO.setPhotoURL(photoUrl);
					return animalDTO;
				}).toList(); // Convert Stream back to list
	}

	@Override
	public AnimalDTO getAnimal(Long id) {

		// Get animal from Repository
		Animal animal = animalRepository.findById(id)
				.orElseThrow(() -> new AnimalNotFoundException("Animal with id " + id + " do not exist"));

		// map animal to AnimalDTO and return it
		AnimalDTO animalDTO = mapper.map(animal, AnimalDTO.class);

		String photoUrl = backendURL + "/"+path + animalDTO.getPhoto();
		animalDTO.setPhotoURL(photoUrl);

		return animalDTO;

	}

	@Override
	public AnimalDTO addNewAnimal(AnimalDTO animalDTO, MultipartFile file) throws IOException {

		String uploadedFileName = fileService.uploadFile(path, file);

		animalDTO.setPhoto(uploadedFileName);
		animalDTO.setStatus(Status.AVAILABLE);

		Animal animal = animalRepository.save(mapper.map(animalDTO, Animal.class)); // Map animalDTO to animal and save
																					// it

		String photoUrl = backendURL + "/"+path + uploadedFileName;

		// map the saved animal entity to animalDTO and return it
		animalDTO = mapper.map(animal, AnimalDTO.class);
		animalDTO.setPhotoURL(photoUrl);
		return animalDTO;
	}

	@Override
	public AnimalDTO updateAnimal(Long id, AnimalDTO animalDTO, MultipartFile file) throws IOException {

		// Get Animal from Repository
		Animal animal = animalRepository.findById(id)
				.orElseThrow(() -> new AnimalNotFoundException("Animal with id " + id + " do not exist"));

		String fileName = animal.getPhoto();
		
		if (file != null) {
			Files.deleteIfExists(Paths.get(path + File.separator + fileName));
			fileName = fileService.uploadFile(path, file);
		}

		animalDTO.setPhoto(fileName);

		// Update Animal details
		mapper.map(animalDTO, animal);

		// save animal in database and map the returned animal entity to animalDTO
		animalDTO = mapper.map(animalRepository.save(animal), AnimalDTO.class);

		String photoUrl = backendURL + "/"+path + animal.getPhoto();
		animalDTO.setPhotoURL(photoUrl);

		return animalDTO;

	}

	@Override
	public void deleteAnimal(Long id) throws IOException {
		// Check if id is not null
		if (id != null) {
			Animal animal = animalRepository.findById(id)
					.orElseThrow(() -> new AnimalNotFoundException("Animal with id " + id + " do not exist"));
			
			Files.deleteIfExists(Paths.get(path + File.separator + animal.getPhoto()));
			
			animalRepository.deleteById(id);
		}
	}

	@Override
	public List<AnimalDTO> getPetByType(Category pet) {
		return animalRepository.findByCategory(pet) // Get all animal entities from DB
				.stream() // Convert animal list to stream
				.map(entity -> {
					AnimalDTO animalDTO = mapper.map(entity, AnimalDTO.class);
					String photoUrl = backendURL + "/"+path + animalDTO.getPhoto();
					animalDTO.setPhotoURL(photoUrl);
					return animalDTO;
				}).toList(); // Convert Stream back to list
	}

}
