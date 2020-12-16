package com.partyhost.controller;

import com.partyhost.exception.*;
import com.partyhost.model.users.UserFriends;
import com.partyhost.model.users.Users;
import com.partyhost.repository.users.UserFriendsRepository;
import com.partyhost.repository.users.UsersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UserFriendsRepository userFriendsRepository;

    private final UsersControllerFunctions usersControllerFunctions = new UsersControllerFunctions();

    private List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    @PostMapping("/signup")
    public Users createUser(@RequestBody Users user) {
        List<Users> users = getAllUsers();
        for (Users tempUser: users) {
            if(user.getEmailId().equals(tempUser.getEmailId())) {
                throw new UserAlreadyExistsException();
            }
        }
        return usersRepository.save(user);
    }

    @PostMapping("/login")
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

    @PostMapping("/updateUserCredentials")
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

    @PostMapping("/updatePassword")
    public Users updatePassword(@RequestBody Map<String, String> json) {
        UUID id = UUID.fromString(json.get("id"));
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

    @PostMapping("/addFriend")
    public List<Users> addFriend(@RequestBody Map<String, String> json) {
        UUID userId = UUID.fromString(json.get("id"));
        String friendEmailId = json.get("friendEmailId");
        Optional<Users> tempUser = usersRepository.findById(userId);
        UUID friendId = usersControllerFunctions.findIdByEmail(friendEmailId);
        Optional<Users> tempFriend = usersRepository.findById(friendId);
        if(tempUser.isPresent() && tempFriend.isPresent() && !userId.equals(friendId)) {
            Users user = tempUser.get();
            Users friend = tempFriend.get();
            if(user.getDetailedFriendsList(usersRepository).contains(friend)) {
                throw new AlreadyAFriendException();
            }
            UserFriends newFriend = new UserFriends(user, friendId);
            userFriendsRepository.save(newFriend);
            UserFriends reverseFriendship = new UserFriends(friend, userId);
            userFriendsRepository.save(reverseFriendship);
            return user.getDetailedFriendsList(usersRepository);
        }
        else {
            throw new BadRequestException();
        }
    }

    @PostMapping("/friendList")
    public List<Users> getFriendList(@RequestBody Map<String, String> json) {
        UUID userId = UUID.fromString(json.get("id"));
        Optional<Users> tempUser = usersRepository.findById(userId);
        if(tempUser.isPresent()) {
            Users user = tempUser.get();
            return user.getDetailedFriendsList(usersRepository);
        }
        else {
            throw new BadRequestException();
        }
    }

    @PostMapping("/getFriendsAmount")
    public List<UserFriends> getFriendAmounts(@RequestBody Map<String, String> json) {
        UUID userId = UUID.fromString(json.get("id"));
        Optional<Users> tempUser = usersRepository.findById(userId);
        if(tempUser.isPresent()) {
            Users user = tempUser.get();
            return user.fetchFriendsAmountList();
        }
        else {
            throw new BadRequestException();
        }
    }

    @PostMapping("/getDueAmount")
    public Double getDueAmount(@RequestBody Map<String, String> json) {
        UUID userId = UUID.fromString(json.get("id"));
        Optional<Users> tempUser = usersRepository.findById(userId);
        if(tempUser.isPresent()) {
            Users user = tempUser.get();
            double amountDue = 0;
            for(UserFriends userFriends : user.fetchFriendsAmountList()) {
                amountDue += userFriends.getAmountDue();
            }
            return amountDue;
        }
        else {
            throw new BadRequestException();
        }
    }

    public class UsersControllerFunctions {

        public UUID findIdByEmail(String emailId) {
            List<Users> usersList = usersRepository.findAll();
            for (Users user: usersList) {
                if(emailId.equals(user.getEmailId())) {
                    return user.getId();
                }
            }
            throw new UserDoesNotExistException();
        }

    }

}
