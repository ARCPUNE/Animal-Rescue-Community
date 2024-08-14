package com.arc.dto;

import java.math.BigDecimal;
import java.util.Date;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseDTO {

    private int id;

    @NotNull(message = "Amount must be provided")
    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than 0")
    @Digits(integer = 8, fraction = 2, message = "Amount must have up to 8 integer digits and 2 fractional digits")
    private BigDecimal amount;

    @NotNull(message = "Date must be provided")
    private Date date;

    @Size(max = 100, message = "Paid to should not exceed 100 characters")
    private String paidTo;

    private String expenseProof;
    private String expenseProofURL;

    private String description;
}
