package com.partyhost.controller;

import com.partyhost.model.Users;
import com.partyhost.repository.UsersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/user/signup")
    public Users createUser(@RequestBody Users user) {
        return usersRepository.save(user);
    }

}
