package com.home.cgroupintbe.controller;


import com.home.cgroupintbe.dto.AuthRequest;
import com.home.cgroupintbe.dto.UserRequest;
import com.home.cgroupintbe.dto.UserResponse;
import com.home.cgroupintbe.entities.User;
import com.home.cgroupintbe.entities.enums.Role;
import com.home.cgroupintbe.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class AuthController {

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    @PostMapping("/auth/register")
    public ResponseEntity<Object> register(@Valid @RequestBody UserRequest userRequest) {
        User userFromRequest = User
                .builder()
                .name(userRequest.getName())
                .email(userRequest.getEmail())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .role(Role.ADMIN)
                .build();

        User user = userService.save(userFromRequest);

        UserResponse userResponse = new UserResponse();
        BeanUtils.copyProperties(user, userResponse);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(userResponse);
    }

    @PostMapping("/auth/authenticate")
    public ResponseEntity<Object> authenticate(@Valid @RequestBody AuthRequest authRequest, HttpSession httpServletRequest) {

        Authentication auth = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(auth);
        User user = (User) auth.getPrincipal();

        UserResponse userResponse = new UserResponse();
        BeanUtils.copyProperties(user, userResponse);

        httpServletRequest.setAttribute("user", userResponse);

        return ResponseEntity
                .status(HttpStatus.OK)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(userResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<Object> destroy(HttpSession httpSession) {
        httpSession.invalidate();
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    @GetMapping("/users/me")
    public ResponseEntity<Object> getDetails(HttpServletRequest httpServletRequest) {
        UserResponse user = (UserResponse) httpServletRequest.getSession().getAttribute("user");
        return ResponseEntity
                .status(HttpStatus.OK)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(user);
    }

}
