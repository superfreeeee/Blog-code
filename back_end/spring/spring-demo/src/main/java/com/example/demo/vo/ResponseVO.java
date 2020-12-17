package com.example.demo.vo;

public class ResponseVO {
    private Boolean success;
    private String message;
    private Object content;

    public static ResponseVO buildSimple(Boolean success) {
        ResponseVO res = new ResponseVO();
        res.setSuccess(success);
        return res;
    }

    public static ResponseVO buildSuccess() {
        return buildSuccess("response success");
    }

    public static ResponseVO buildSuccess(Object content) {
        ResponseVO res = new ResponseVO();
        res.setSuccess(true);
        res.setContent(content);
        return res;
    }

    public static ResponseVO buildFailure() {
        return buildFailure("response failure");
    }

    public static ResponseVO buildFailure(String message) {
        ResponseVO res = new ResponseVO();
        res.setSuccess(false);
        res.setMessage(message);
        return res;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getContent() {
        return content;
    }

    public void setContent(Object content) {
        this.content = content;
    }
}
