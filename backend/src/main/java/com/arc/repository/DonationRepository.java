package com.arc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.arc.entities.Donation;
import com.arc.entities.User;

public interface DonationRepository extends JpaRepository<Donation, Long> {

	@Query("SELECT d FROM Donation d JOIN FETCH d.userId")
	List<Donation> findAllDonationsWithUsers();

	Optional<Donation> findByUserId(User userId);
	
}
