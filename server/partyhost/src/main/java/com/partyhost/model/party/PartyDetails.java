package com.partyhost.model.party;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "party_details")
@SecondaryTable(name = "party_friends_link", pkJoinColumns = @PrimaryKeyJoinColumn(name="party_id"))
public class PartyDetails {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "uuid2")
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "host_id")
    private UUID hostId;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "split_equally")
    private boolean splitEqually;

    @OneToMany(mappedBy = "partyDetails")
    private List<PartyFriendsLink> partyFriendsLinkList;

    public PartyDetails() {

    }

    public PartyDetails(UUID hostId, Double amount, boolean splitEqually) {
        this.hostId = hostId;
        this.amount = amount;
        this.splitEqually = splitEqually;
    }

    public UUID getId() {
        return id;
    }

    public UUID getHostId() {
        return hostId;
    }

    public void setHostId(UUID hostId) {
        this.hostId = hostId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public boolean isSplitEqually() {
        return splitEqually;
    }

    public void setSplitEqually(boolean splitEqually) {
        this.splitEqually = splitEqually;
    }

    public List<PartyFriendsLink> getPartyFriendsLinkList() {
        return partyFriendsLinkList;
    }

    public void setPartyFriendsLinkList(List<PartyFriendsLink> partyFriendsLinkList) {
        this.partyFriendsLinkList = partyFriendsLinkList;
    }
}
