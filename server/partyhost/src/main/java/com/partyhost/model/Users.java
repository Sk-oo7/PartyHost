package com.partyhost.model;

import javax.persistence.*;

@Entity
@Table(name = "users")
@SecondaryTable(name = "password_storage", pkJoinColumns = @PrimaryKeyJoinColumn(name="user_id"))
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String emailId;

    @Column(name = "mobile_number")
    private Long mobileNumber;

    @Column(table = "password_storage", name="password")
    private String password;

    public long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public Long getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(Long mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean passwordAuthenticate(String password) {
        return this.password.equals(password);
    }
}
