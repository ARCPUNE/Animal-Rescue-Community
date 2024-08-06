package com.arc.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arc.repository.AdoptionRepository;
import com.arc.repository.AnimalRepository;
import com.arc.repository.UserRepository;


@Service
@Transactional
public class AdoptionService {
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private AdoptionRepository adoptionRepository;
	
	@Autowired
	private AnimalRepository animalRepository;
	
	@Autowired
	private UserRepository userRepository;
	
}
