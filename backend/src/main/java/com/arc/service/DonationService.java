package com.arc.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arc.repository.DonationRepository;
import com.arc.repository.UserRepository;


@Service
@Transactional
public class DonationService {
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private DonationRepository donationRepository;
	
	@Autowired
	private UserRepository userRepository;
	
}
