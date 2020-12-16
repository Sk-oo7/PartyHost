package com.partyhost.model.party;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "party_friends_link")
public class PartyFriendsLink {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "uuid2")
    @Column(name = "id", nullable = false)
    private UUID id;
    
    @ManyToOne
    @JoinColumn(name = "party_id")
    private PartyDetails partyDetails;

    @Column(name = "friend_id")
    private UUID friendId;

    @Column(name = "friend_amount")
    private Double friendsAmount;

    public PartyFriendsLink() {}

    public PartyFriendsLink(PartyDetails partyDetails, UUID friendId, Double friendsAmount) {
        this.partyDetails = partyDetails;
        this.friendId = friendId;
        this.friendsAmount = friendsAmount;
    }

    public UUID getId() {
        return id;
    }

    public PartyDetails getPartyDetails() {
        return partyDetails;
    }

    public void setPartyDetails(PartyDetails partyDetails) {
        this.partyDetails = partyDetails;
    }

    public UUID getFriendId() {
        return friendId;
    }

    public void setFriendId(UUID friendId) {
        this.friendId = friendId;
    }

    public Double getFriendsAmount() {
        return friendsAmount;
    }

    public void setFriendsAmount(Double friendsAmount) {
        this.friendsAmount = friendsAmount;
    }
}
