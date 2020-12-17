package com.example.demo.testEnum.enums;

public enum CustomerException {
    ControllerException(0, "unknown controller exception"),
    ServiceException(1, "unknown service exception"),
    DaoException(2, "unknown dao exception");

    private int code;
    private String message;

    CustomerException(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    @Override
    public String toString() {
        return this.code + "\n" + this.message;
    }
}
