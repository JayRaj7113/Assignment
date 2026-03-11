package com.example.auth.dto;

import com.example.auth.entity.User;

public class UserMapper {

    public static UserMapper INSTANCE = new UserMapper();

    public User toUser(RegisterRequest request) {
        if (request == null) {
            return null;
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        return user;
    }

    public AuthResponse toAuthResponse(User user) {
        if (user == null) {
            return null;
        }

        AuthResponse authResponse = new AuthResponse();
        authResponse.setName(user.getName());
        authResponse.setEmail(user.getEmail());
        authResponse.setRole(user.getRole());

        return authResponse;
    }
}
