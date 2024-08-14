package com.arc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.arc.entities.User;

import jakarta.transaction.Transactional;



public interface UserRepository extends JpaRepository<User, Long>{
	
	boolean existsByEmail(String email);

	Optional<User> findByEmail(String email);
	
	@Modifying
	@Transactional
	@Query("update User u set u.password = :password where u.email = :email")
	void updatePassword(String email, String password);
	
}
