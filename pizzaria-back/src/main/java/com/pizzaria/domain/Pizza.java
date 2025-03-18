package com.pizzaria.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Entity
@Table(name = "pizza")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pizza {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false)
    @NotNull(message = "O nome da pizza é obrigatório")
    private String name;
    
    @Column(name = "description", nullable = false)
    @NotNull(message = "A descrição da pizza é obrigatória")
    private String description;
    
    @Column(name = "ingredients", nullable = false)
    @Size(min = 1, message = "A pizza deve ter pelo menos um ingrediente")
    @NotNull(message = "Os ingredientes da pizza são obrigatórios")
    private String[] ingredients;
    
    @Column(name = "price", nullable = false)
    @NotNull(message = "O preço da pizza é obrigatório")
    private BigDecimal price;
} 