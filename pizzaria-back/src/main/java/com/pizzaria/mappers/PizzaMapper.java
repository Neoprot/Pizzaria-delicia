package com.pizzaria.mappers;

import com.pizzaria.domain.Pizza;
import com.pizzaria.dtos.PizzaRequestDTO;
import com.pizzaria.dtos.PizzaResponseDTO;
import org.springframework.stereotype.Component;

@Component
public class PizzaMapper {

    public Pizza toEntity(PizzaRequestDTO dto) {
        Pizza pizza = new Pizza();
        pizza.setName(dto.getName());
        pizza.setDescription(dto.getDescription());
        pizza.setIngredients(dto.getIngredients());
        pizza.setPrice(dto.getPrice());
        return pizza;
    }
    
    public void updateEntityFromDTO(PizzaRequestDTO dto, Pizza pizza) {
        pizza.setName(dto.getName());
        pizza.setDescription(dto.getDescription());
        pizza.setIngredients(dto.getIngredients());
        pizza.setPrice(dto.getPrice());
    }

    public PizzaResponseDTO toResponseDTO(Pizza pizza) {
        return new PizzaResponseDTO(
                pizza.getId(),
                pizza.getName(),
                pizza.getDescription(),
                pizza.getIngredients(),
                pizza.getPrice()
        );
    }
} 