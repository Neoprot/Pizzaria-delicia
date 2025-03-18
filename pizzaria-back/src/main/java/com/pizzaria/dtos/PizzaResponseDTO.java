package com.pizzaria.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PizzaResponseDTO {
    private Long id;
    private String name;
    private String description;
    private String[] ingredients;
    private BigDecimal price;
} 