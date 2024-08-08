package com.arc.security.service;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.arc.entities.Role;
import com.arc.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetialsimpl implements UserDetails {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private String email;
	private String password;
	private String phoneNo;
	private Role role;
	private String address;
	private Collection<? extends GrantedAuthority> authorities;
	
	
	public static UserDetialsimpl build(User user) {
		GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().name());
		
		return new UserDetialsimpl(
				user.getId(),
				user.getName(),
				user.getEmail(),
				user.getPassword(),
				user.getPhoneNo(),
				user.getRole(),
				user.getAddress(),
				List.of(authority)
				);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	
	
}
