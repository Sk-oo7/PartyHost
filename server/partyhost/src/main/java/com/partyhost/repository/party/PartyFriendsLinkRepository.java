package com.partyhost.repository.party;

import com.partyhost.model.party.PartyFriendsLink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PartyFriendsLinkRepository extends JpaRepository<PartyFriendsLink, UUID> {
}
