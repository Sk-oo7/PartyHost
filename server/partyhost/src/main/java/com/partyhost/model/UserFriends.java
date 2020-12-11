package com.partyhost.model;

import javax.persistence.*;

@Entity
@Table(name = "friend_list")
public class UserFriends {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;

    @Column(name = "friend_id")
    private Long friendId;

    @Column(name = "amount_due")
    private Double amountDue = 0.00;

    public UserFriends() {}

    public UserFriends(Users users, Long friendId) {
        this.users = users;
        this.friendId = friendId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Long getFriendId() {
        return friendId;
    }

    public void setFriendId(Long friendId) {
        this.friendId = friendId;
    }

    public Double getAmountDue() {
        return amountDue;
    }

    public void modifyAmountDue(Double amount) {
        amountDue += amount;
    }

}
