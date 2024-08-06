package com.arc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.arc.entities.Adoption;

public interface AdoptionRepository extends JpaRepository<Adoption, Long> {

	@Query("SELECT a from Adoption a JOIN FETCH a.animalId JOIN FETCH a.userId")
 	List<Adoption> findAllAdoptionsWithAnimalAndUser();
	
}
