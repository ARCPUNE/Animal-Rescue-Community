package com.arc.dto;

import java.math.BigDecimal;
import java.util.Date;

import com.arc.entities.Donation.PaymentMethod;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DonationDTO {

	private int id;

	@NotNull(message = "User ID must be provided")
	private UserDTO userId;

	@NotNull(message = "Amount must be provided")
	@DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than 0")
	@Digits(integer = 8, fraction = 2, message = "Amount must have up to 8 integer digits and 2 fractional digits")
	private BigDecimal amount;

	@NotNull(message = "Date must be provided")
	private Date date;

	@NotNull(message = "Payment method must be provided")
	private PaymentMethod paymentMethod;

	@NotNull(message = "Donation proof must be provided")
	private String donationProof;
	private String donationProofURL;
}
