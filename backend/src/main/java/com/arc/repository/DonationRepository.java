package com.arc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arc.entities.Donation;

public interface DonationRepository extends JpaRepository<Donation, Long> {

}
