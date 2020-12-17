package com.example.testlogin.login;

public class LoginResponse {

    private static final int SUCCESS_STATUS = 200;
    private static final int FAIL_STATUS = 400;

    private int code; // 狀態碼
    private Object content; // 返回內容

    /**
     * 基礎構造方法
     * @param code
     * @param content
     */
    LoginResponse(int code, Object content) {
        this.code = code;
        this.content = content;
    }

    /**
     * 靜態成功方法
     * @return
     */
    public static LoginResponse success() {
        return new LoginResponse(SUCCESS_STATUS, null);
    }

    public static LoginResponse success(Object content) {
        return new LoginResponse(SUCCESS_STATUS, content);
    }

    /**
     * 靜態失敗方法
     * @param msg
     * @return
     */
    public static LoginResponse fail(String msg) {
        return new LoginResponse(FAIL_STATUS, msg);
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Object getContent() {
        return content;
    }

    public void setContent(Object content) {
        this.content = content;
    }
}
