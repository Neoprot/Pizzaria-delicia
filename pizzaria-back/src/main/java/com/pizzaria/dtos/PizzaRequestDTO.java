package com.pizzaria.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PizzaRequestDTO {
    @NotBlank(message = "O nome da pizza é obrigatório")
    private String name;
    
    @NotBlank(message = "A descrição da pizza é obrigatória")
    private String description;
    
    @NotEmpty(message = "A pizza deve ter pelo menos um ingrediente")
    private String[] ingredients;
    
    @NotNull(message = "O preço da pizza é obrigatório")
    @Positive(message = "O preço deve ser maior que zero")
    private BigDecimal price;
} 