package com.arc.dto;

import com.arc.entities.Category;
import com.arc.entities.Animal.Gender;
import com.arc.entities.Animal.Status;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnimalDTO {

    private Long id;

    @NotBlank(message = "Name has to be provided")
    private String name;

    @NotNull(message = "Category must be provided")
    private Category category;

    @Size(max = 20, message = "Breed should not exceed 20 characters")
    private String breed;

    @NotNull(message = "Age must be provided")
    @Positive
    private double age;

    @NotNull(message = "Vaccination status must be provided")
    private boolean vaccinated;
    
    @NotNull(message = "Dewormed status must be provided")
    private boolean dewormed;

    @NotNull(message = "Gender must be provided")
    private Gender gender;

    @NotBlank(message = "Location of animal must be provided")
    private String location;

    @NotNull(message = "Photo must be provided")
    private String photo;
    
    private String photoURL;

    private Status status;

    private String description;
}
