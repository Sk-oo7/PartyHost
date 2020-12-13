package com.partyhost.controller;

import com.partyhost.exception.BadRequestException;
import com.partyhost.model.UserFriends;
import com.partyhost.model.Users;
import com.partyhost.repository.UserFriendsRepository;
import com.partyhost.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/party")
public class PartyController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UserFriendsRepository userFriendsRepository;

    private final PartyControllerFunctions partyControllerFunctions = new PartyControllerFunctions();

    @PostMapping("/createParty")
    public Object createParty(@RequestBody Map<String, String> json) {
        Long userId = Long.parseLong(json.get("id"));
        Optional<Users> tempUser = usersRepository.findById(userId);
        if(tempUser.isPresent()) {
            Users user = tempUser.get();
            double amount = Double.parseDouble(json.get("amount"));
            boolean splitEqually = Boolean.parseBoolean(json.get("splitEqually"));
            String friendsString = json.get("friends");
            friendsString = friendsString.substring(1, friendsString.length() - 1);
            String[] friendsStringArray = friendsString.split(",");
            List<Long> friendsArray = new ArrayList<>(friendsStringArray.length);
            for (String friendId: friendsStringArray) {
                friendsArray.add(Long.parseLong(friendId));
            }
            double partyAmountDue = 0;
            if(splitEqually) {
                double amountPerPerson = amount/(friendsArray.size() + 1);
                partyAmountDue = amount - amountPerPerson;
                for (Long friendId : friendsArray) {
                    partyControllerFunctions.addDueAmountToFriends(user, userId, friendId, amountPerPerson);
                }
            }
            else {
                String divideBy = json.get("divideBy");
                String friendsAmountString = json.get("friendsAmount");
                friendsAmountString = friendsAmountString.substring(1, friendsAmountString.length() - 1);
                String[] friendsAmountStringArray = friendsAmountString.split(",");
                List<Long> friendsAmountArray = new ArrayList<>(friendsAmountStringArray.length);
                for (String friendId: friendsAmountStringArray) {
                    friendsAmountArray.add(Long.parseLong(friendId));
                }
                if(divideBy.equals("percent")) {
                    for (int i = 0; i < friendsAmountArray.size(); i++) {
                        friendsAmountArray.set(i, ((long) (friendsAmountArray.get(i) * amount) / 100));
                    }
                }
                for (int i = 0; i < friendsArray.size(); i++) {
                    partyAmountDue += partyControllerFunctions.addDueAmountToFriends(user, userId, friendsArray.get(i), friendsAmountArray.get(i));
                }
            }
            return null;
        }
        else {
            throw new BadRequestException();
        }
    }

    private class PartyControllerFunctions {
        private double addDueAmountToFriends(Users user, Long userId, Long friendId, double amount) {
            UserFriends friendship = user.getFriendshipDetail(friendId);
            if(friendship != null) {
                friendship.modifyAmountDue(amount);
                userFriendsRepository.save(friendship);
                Optional<Users> tempFriend = usersRepository.findById(friendId);
                if(tempFriend.isPresent()) {
                    Users friend = tempFriend.get();
                    friendship = friend.getFriendshipDetail(userId);
                    if(friendship != null) {
                        friendship.modifyAmountDue(amount * -1.0);
                        userFriendsRepository.save(friendship);
                    }
                }
            }
            return amount;
        }
    }

}
