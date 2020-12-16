package com.partyhost.model.party;

import javax.persistence.*;

@Entity
@Table(name = "party_friends_link")
public class PartyFriendsLink {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "party_id")
    private PartyDetails partyDetails;

    @Column(name = "friend_id")
    private Long friendId;

    @Column(name = "friend_amount")
    private Double friendsAmount;

    public PartyFriendsLink() {}

    public PartyFriendsLink(PartyDetails partyDetails, Long friendId, Double friendsAmount) {
        this.partyDetails = partyDetails;
        this.friendId = friendId;
        this.friendsAmount = friendsAmount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PartyDetails getPartyDetails() {
        return partyDetails;
    }

    public void setPartyDetails(PartyDetails partyDetails) {
        this.partyDetails = partyDetails;
    }

    public Long getFriendId() {
        return friendId;
    }

    public void setFriendId(Long friendId) {
        this.friendId = friendId;
    }

    public Double getFriendsAmount() {
        return friendsAmount;
    }

    public void setFriendsAmount(Double friendsAmount) {
        this.friendsAmount = friendsAmount;
    }
}
