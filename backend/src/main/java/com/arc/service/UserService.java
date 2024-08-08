package com.arc.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arc.dto.UserDTO;

@Service
@Transactional
public interface UserService {

	List<UserDTO> getAllUsers();

	UserDTO getUser(Long id);

	UserDTO addNewUser(UserDTO userDTO);

	UserDTO updateUser(Long id, UserDTO userDTO);
	
	
}
