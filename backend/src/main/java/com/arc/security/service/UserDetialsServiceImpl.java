package com.arc.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arc.entities.User;
import com.arc.exception.UserNotFoundException;
import com.arc.repository.UserRepository;


@Service
@Transactional
public class UserDetialsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username)
				.orElseThrow(()->new UserNotFoundException("User with username "+ username+" not found"));

		
		return UserDetialsimpl.build(user);
	}

}
