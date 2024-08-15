package com.arc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arc.entities.Animal;
import com.arc.entities.Category;


public interface AnimalRepository extends JpaRepository<Animal, Long>{

	List<Animal> findByCategory(Category category);
	
}
