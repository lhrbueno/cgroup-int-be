package com.home.cgroupintbe.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse implements Serializable {

    @JsonIgnore
    private static final long serialVersionUID = 1L;
    private Long id;
    private String name;
    private String email;
}
