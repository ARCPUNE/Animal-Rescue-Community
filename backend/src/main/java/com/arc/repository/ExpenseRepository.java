package com.arc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arc.entities.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
