package com.partyhost.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class AlreadyAFriendException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public AlreadyAFriendException() {
        super("A user with the given email address is already your friend");
    }

}
