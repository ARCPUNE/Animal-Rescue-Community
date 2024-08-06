package com.arc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arc.entities.Adoption;

public interface AdoptionRepository extends JpaRepository<Adoption, Long> {

}
