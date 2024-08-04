package com.arc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arc.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
