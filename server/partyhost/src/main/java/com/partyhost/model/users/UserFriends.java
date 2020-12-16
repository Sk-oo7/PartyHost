package com.partyhost.model.users;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "friend_list")
public class UserFriends {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "uuid2")
    @Column(name = "id", nullable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;

    @Column(name = "friend_id")
    private UUID friendId;

    @Column(name = "amount_due")
    private Double amountDue = 0.00;

    public UserFriends() {}

    public UserFriends(Users users, UUID friendId) {
        this.users = users;
        this.friendId = friendId;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public UUID getFriendId() {
        return friendId;
    }

    public void setFriendId(UUID friendId) {
        this.friendId = friendId;
    }

    public Double getAmountDue() {
        return amountDue;
    }

    public void modifyAmountDue(Double amount) {
        amountDue += amount;
    }

}
