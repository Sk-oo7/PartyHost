package com.partyhost.controller;

import com.partyhost.exception.BadRequestException;
import com.partyhost.exception.EmailPasswordDidNotMatchException;
import com.partyhost.exception.UserAlreadyExistsException;
import com.partyhost.exception.UserDoesNotExistException;
import com.partyhost.model.UserFriends;
import com.partyhost.model.Users;
import com.partyhost.repository.UserFriendsRepository;
import com.partyhost.repository.UsersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    private List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    @PostMapping("/user/signup")
    public Users createUser(@RequestBody Users user) {
        List<Users> users = getAllUsers();
        for (Users tempUser: users) {
            if(user.getEmailId().equals(tempUser.getEmailId())) {
                throw new UserAlreadyExistsException();
            }
        }
        return usersRepository.save(user);
    }

    @PostMapping("/user/login")
    public Users login(@RequestBody Map<String, String> json) {
        String emailId = json.get("emailId");
        String password = json.get("password");
        List<Users> users = getAllUsers();
        for (Users tempUser: users) {
            if (emailId.equals(tempUser.getEmailId())) {
                if(tempUser.passwordAuthenticate(password)) {
                    return tempUser;
                }
                else {
                    throw new EmailPasswordDidNotMatchException();
                }
            }
        }
        throw new EmailPasswordDidNotMatchException();
    }

    @PostMapping("/user/updateUserCredentials")
    public Users updateCredentials(@RequestBody Users user) {
        Optional<Users> tempUser = usersRepository.findById(user.getId());
        if(tempUser.isPresent()) {
            Users matchedUser = tempUser.get();
            if (user.getFirstName() != null) {
                matchedUser.setFirstName(user.getFirstName());
            }
            if (user.getLastName() != null) {
                matchedUser.setLastName(user.getLastName());
            }
            if (user.getMobileNumber() != null) {
                matchedUser.setMobileNumber(user.getMobileNumber());
            }
            usersRepository.save(matchedUser);
            return matchedUser;
        }
        else {
            throw new BadRequestException();
        }
    }

    @PostMapping("/user/updatePassword")
    public Users updatePassword(@RequestBody Map<String, String> json) {
        Long id = Long.parseLong(json.get("id"));
        String password = json.get("password");
        Optional<Users> tempUser = usersRepository.findById(id);
        if(tempUser.isPresent()) {
            Users matchedUser = tempUser.get();
            matchedUser.setPassword(password);
            usersRepository.save(matchedUser);
            return matchedUser;
        }
        else {
            throw new BadRequestException();
        }
    }

}
