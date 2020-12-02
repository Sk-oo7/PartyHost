package com.partyhost.repository;

import com.partyhost.model.UserFriends;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserFriendsRepository extends JpaRepository<UserFriends, Long> {
}
