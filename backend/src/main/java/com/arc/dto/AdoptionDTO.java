package com.arc.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdoptionDTO {

    private Long id;

    @NotNull
    private AnimalDTO animalId;

    @NotNull
    private UserDTO userId;

    @NotNull
    private LocalDate adoptionDate;

    @NotBlank
    private String status;

    @NotBlank
    @Size(max = 30)
    private String govtId;
}

