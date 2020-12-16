package com.partyhost.model.party;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "party_details")
@SecondaryTable(name = "party_friends_link", pkJoinColumns = @PrimaryKeyJoinColumn(name="party_id"))
public class PartyDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "host_id")
    private Long hostId;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "split_equally")
    private boolean splitEqually;

    @OneToMany(mappedBy = "partyDetails")
    private List<PartyFriendsLink> partyFriendsLinkList;

    public PartyDetails() {

    }

    public PartyDetails(Long hostId, Double amount, boolean splitEqually) {
        this.hostId = hostId;
        this.amount = amount;
        this.splitEqually = splitEqually;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getHostId() {
        return hostId;
    }

    public void setHostId(Long hostId) {
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
