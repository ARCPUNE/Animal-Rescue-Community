package com.arc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arc.entities.Animal;

public interface AnimalRepository extends JpaRepository<Animal, Long>{

}
