package com.partyhost.repository.party;

import com.partyhost.model.party.PartyDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PartyDetailsRepository extends JpaRepository<PartyDetails, UUID> {
}
