package com.partyhost.repository.party;

import com.partyhost.model.party.PartyDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartyDetailsRepository extends JpaRepository<PartyDetails, Long> {
}
