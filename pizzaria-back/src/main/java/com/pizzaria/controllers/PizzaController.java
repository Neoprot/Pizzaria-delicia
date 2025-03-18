package com.pizzaria.controllers;

import com.pizzaria.dtos.PizzaRequestDTO;
import com.pizzaria.dtos.PizzaResponseDTO;
import com.pizzaria.services.PizzaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pizzas")
@RequiredArgsConstructor
public class PizzaController {

    @Autowired
    private PizzaService pizzaService;

    @GetMapping
    public ResponseEntity<List<PizzaResponseDTO>> getAllPizzas() {
        List<PizzaResponseDTO> pizzas = pizzaService.findAll();
        return ResponseEntity.ok(pizzas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PizzaResponseDTO> getPizzaById(@PathVariable Long id) {
        PizzaResponseDTO pizza = pizzaService.findById(id);
        return ResponseEntity.ok(pizza);
    }

    @PostMapping
    public ResponseEntity<PizzaResponseDTO> createPizza(@Valid @RequestBody PizzaRequestDTO requestDTO) {
        PizzaResponseDTO createdPizza = pizzaService.create(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPizza);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PizzaResponseDTO> updatePizza(
            @PathVariable Long id,
            @Valid @RequestBody PizzaRequestDTO requestDTO) {
        PizzaResponseDTO updatedPizza = pizzaService.update(id, requestDTO);
        return ResponseEntity.ok(updatedPizza);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePizza(@PathVariable Long id) {
        pizzaService.delete(id);
        return ResponseEntity.noContent().build();
    }
} 