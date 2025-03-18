package com.pizzaria.services;

import com.pizzaria.domain.Pizza;
import com.pizzaria.dtos.PizzaRequestDTO;
import com.pizzaria.dtos.PizzaResponseDTO;
import com.pizzaria.exceptions.ResourceNotFoundException;
import com.pizzaria.mappers.PizzaMapper;
import com.pizzaria.repositories.PizzaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PizzaService {

    @Autowired
    private PizzaRepository pizzaRepository;
    @Autowired
    private PizzaMapper pizzaMapper;

    public List<PizzaResponseDTO> findAll() {
        return pizzaRepository.findAll().stream()
                .map(pizzaMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public PizzaResponseDTO findById(Long id) {
        Pizza pizza = getPizzaById(id);
        return pizzaMapper.toResponseDTO(pizza);
    }

    @Transactional
    public PizzaResponseDTO create(PizzaRequestDTO requestDTO) {
        Pizza pizza = pizzaMapper.toEntity(requestDTO);
        Pizza savedPizza = pizzaRepository.save(pizza);
        return pizzaMapper.toResponseDTO(savedPizza);
    }

    @Transactional
    public PizzaResponseDTO update(Long id, PizzaRequestDTO requestDTO) {
        Pizza pizza = getPizzaById(id);
        pizzaMapper.updateEntityFromDTO(requestDTO, pizza);
        Pizza updatedPizza = pizzaRepository.save(pizza);
        return pizzaMapper.toResponseDTO(updatedPizza);
    }

    @Transactional
    public void delete(Long id) {
        Pizza pizza = getPizzaById(id);
        pizzaRepository.delete(pizza);
    }

    private Pizza getPizzaById(Long id) {
        return pizzaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pizza not found with id: " + id));
    }
} 