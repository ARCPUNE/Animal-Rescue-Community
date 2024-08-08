package com.arc.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.arc.dto.UserDTO;
import com.arc.entities.User;
import com.arc.exception.UserAlreadyExistsException;
import com.arc.exception.UserNotFoundException;
import com.arc.repository.UserRepository;
import com.arc.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public List<UserDTO> getAllUsers() {
		
		// Check if users are available
		if(userRepository.count() > 0) {
			
		return userRepository.findAll() // Get List<User> Entities from Repository 
				.stream()  				// make stream of List<User>
				.map(
						entity-> mapper.map(entity, UserDTO.class) // Map every user entity in list to UserDTO
					)
				.toList(); // Convert Stream to List
		}
		throw new UserNotFoundException("No User Available");
	}

	@Override
	public UserDTO getUser(Long id) {
		
		// Check if id is not null and user with specified id exists
		if (id != null && userRepository.existsById(id)) {
			
			// Get User from Repository
			User user = userRepository.findById(id).orElseThrow(()->new UserNotFoundException("User with id "+ id + " do not exist"));
			
			//  map user to UserDTO and return it
			return mapper.map(user, UserDTO.class);			
		}
		throw new UserNotFoundException("User with id "+ id + " do not exist");
	}

	@Override
	public UserDTO addNewUser(UserDTO userDTO) {
		
		// Check if user already exists with the email provided
		if (userRepository.existsByEmail(userDTO.getEmail())) {
			throw new UserAlreadyExistsException("User with email address " + userDTO.getEmail()+" already exists");
		}
		
		String pass = encoder.encode(userDTO.getPassword());
		userDTO.setPassword(pass);
		
		return mapper.map(
				userRepository.save(
						mapper.map(userDTO, User.class) // Map userDTO to user and save it in DB
						), UserDTO.class); // map the saved user entity to userDTO and return it
	}
	
	@Override
	public UserDTO updateUser(Long id, UserDTO userDTO) {
		
		// Check if id is not null and user with specified id exists
		if (id == null || !userRepository.existsById(id)) {
			throw new UserNotFoundException("User with id "+ id + " do not exist");
		}
		
		// Get User from Repository
		User user = userRepository.findById(id).orElseThrow(()->new UserNotFoundException("User with id "+ id + " do not exist"));
	
		// Update user details
		mapper.map(userDTO,user);
		
		// save user in database and map the returned user entity to UserDTO 
		return mapper.map(userRepository.save(user), UserDTO.class);
	}
}
