package com.pizzaria.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pizzaria.domain.Pizza;

@Repository
public interface PizzaRepository extends JpaRepository<Pizza, Long> {
} 