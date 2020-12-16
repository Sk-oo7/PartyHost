package com.partyhost.repository.users;

import com.partyhost.model.users.UserFriends;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserFriendsRepository extends JpaRepository<UserFriends, UUID> {
}
