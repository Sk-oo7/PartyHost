package com.partyhost.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
public class EmailPasswordDidNotMatchException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public EmailPasswordDidNotMatchException() {
        super("The email and password you provided didn't match our database. Please check and try again.");
    }
}
