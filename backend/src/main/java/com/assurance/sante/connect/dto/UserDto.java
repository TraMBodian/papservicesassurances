package com.assurance.sante.connect.dto;

import lombok.*;
import com.assurance.sante.connect.entity.User;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String email;
    private String fullName;
    private String role;
    private String organization;
    private String status;

    public static UserDto fromEntity(User user) {
        return UserDto.builder()
            .id(user.getId())
            .email(user.getEmail())
            .fullName(user.getFullName())
            .role(user.getRole().name())
            .organization(user.getOrganization())
            .status(user.getStatus().name())
            .build();
    }
}
