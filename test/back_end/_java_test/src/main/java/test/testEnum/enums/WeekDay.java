package com.example.demo.testEnum.enums;

public enum WeekDay {
    Monday(1, "Monday", "星期一"),
    Tuesday(2, "Tuesday", "星期二")

    ;
    private int id;
    private String eName;
    private String cName;

    private WeekDay(int id, String eName, String cName) {
        this.id = id;
        this.eName = eName;
        this.cName = cName;
    }

    public int getId() {
        return id;
    }

    public String geteName() {
        return eName;
    }

    public String getcName() {
        return cName;
    }

    public void setId(int id) {
        this.id = id;
    }
}
