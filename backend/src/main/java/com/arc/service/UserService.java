package com.arc.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arc.dto.UserDTO;
import com.arc.repository.UserRepository;

@Service
@Transactional
public class UserService {
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private UserRepository userRepository;

	public List<UserDTO> getAllUsers() {
		return userRepository.findAll().stream().map(entity-> mapper.map(entity, UserDTO.class)).toList();
	}
}
