package com.ssafy.dreamong.domain.exception;

public class ForbiddenException extends RuntimeException{
    public ForbiddenException(String message) {
        super(message);
    }

    public ForbiddenException() {
        this("ForbiddenException");
    }
}
