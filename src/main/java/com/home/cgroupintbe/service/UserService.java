package com.home.cgroupintbe.service;

import com.home.cgroupintbe.entities.User;
import com.home.cgroupintbe.exceptions.UserNotFoundException;
import com.home.cgroupintbe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User findByEmail(String email) {
        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User with email " + email + " was not found"));
    }

    public User save(User user) {
        return userRepository.save(user);
    }


}
