package com.partyhost.controller;

import com.partyhost.exception.BadRequestException;
import com.partyhost.model.party.PartyDetails;
import com.partyhost.model.party.PartyFriendsLink;
import com.partyhost.model.users.UserFriends;
import com.partyhost.model.users.Users;
import com.partyhost.repository.party.PartyDetailsRepository;
import com.partyhost.repository.party.PartyFriendsLinkRepository;
import com.partyhost.repository.users.UserFriendsRepository;
import com.partyhost.repository.users.UsersRepository;
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

    @Autowired
    private PartyDetailsRepository partyDetailsRepository;

    @Autowired
    private PartyFriendsLinkRepository partyFriendsLinkRepository;

    private final PartyControllerFunctions partyControllerFunctions = new PartyControllerFunctions();

    @PostMapping("/createParty")
    public Object createParty(@RequestBody Map<String, String> json) {
        UUID userId = UUID.fromString(json.get("id"));
        Optional<Users> tempUser = usersRepository.findById(userId);
        if(tempUser.isPresent()) {
            Users user = tempUser.get();
            double amount = Double.parseDouble(json.get("amount"));
            boolean splitEqually = Boolean.parseBoolean(json.get("splitEqually"));
            PartyDetails partyDetails = new PartyDetails(userId, amount, splitEqually);
            String friendsString = json.get("friends");
            friendsString = friendsString.substring(1, friendsString.length() - 1);
            String[] friendsStringArray = friendsString.split(",");
            List<UUID> friendsArray = new ArrayList<>(friendsStringArray.length);
            for (String friendId: friendsStringArray) {
                friendsArray.add(UUID.fromString(friendId.substring(1, friendId.length() - 1)));
            }
            double partyAmountDue = 0;
            if(splitEqually) {
                double amountPerPerson = amount/(friendsArray.size() + 1);
                partyDetailsRepository.save(partyDetails);
                for (UUID friendId : friendsArray) {
                    partyAmountDue += partyControllerFunctions.addDueAmountToFriends(user, userId, friendId, ((double)(Math.round(amountPerPerson * 100)))/100);
                    PartyFriendsLink partyFriendsLink = new PartyFriendsLink(partyDetails, friendId, ((double)(Math.round(amountPerPerson * 100)))/100);
                    partyFriendsLinkRepository.save(partyFriendsLink);
                }
            }
            else {
                String divideBy = json.get("divideBy");
                String friendsAmountString = json.get("friendsAmount");
                friendsAmountString = friendsAmountString.substring(1, friendsAmountString.length() - 1);
                String[] friendsAmountStringArray = friendsAmountString.split(",");
                List<Double> friendsAmountArray = new ArrayList<>(friendsAmountStringArray.length);
                for (String friendId: friendsAmountStringArray) {
                    friendsAmountArray.add(Double.parseDouble(friendId));
                }
                if(divideBy.equals("percent")) {
                    for (int i = 0; i < friendsAmountArray.size(); i++) {
                        friendsAmountArray.set(i, ((friendsAmountArray.get(i) * amount) / 100));
                    }
                }
                partyDetailsRepository.save(partyDetails);
                for (int i = 0; i < friendsArray.size(); i++) {
                    partyAmountDue += partyControllerFunctions.addDueAmountToFriends(user, userId, friendsArray.get(i), ((double)(Math.round(friendsAmountArray.get(i) * 100)))/100);
                    PartyFriendsLink partyFriendsLink = new PartyFriendsLink(partyDetails, friendsArray.get(i), ((double)(Math.round(friendsAmountArray.get(i) * 100)))/100);
                    partyFriendsLinkRepository.save(partyFriendsLink);
                }

            }
            PartyFriendsLink partyFriendsLink = new PartyFriendsLink(partyDetails, userId, amount - partyAmountDue);
            partyFriendsLinkRepository.save(partyFriendsLink);
            return null;
        }
        else {
            throw new BadRequestException();
        }
    }

    private class PartyControllerFunctions {
        private double addDueAmountToFriends(Users user, UUID userId, UUID friendId, double amount) {
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
