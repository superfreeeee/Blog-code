package top.csdnb.be.common;

public class Response {

    private boolean success;
    private Object content;

    private Response(boolean success, Object content) {
        this.success = success;
        this.content = content;
    }

    public static Response build(boolean success, Object content) {
        return new Response(success, content);
    }

    public static Response buildSuccess(Object content) {
        return new Response(true, content);
    }

    public static Response buildSuccess() {
        return new Response(true, "success");
    }

    public static Response buildFailure(Object content) {
        return new Response(false, content);
    }

    public static Response buildFailure() {
        return new Response(false, "fail");
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Object getContent() {
        return content;
    }

    public void setContent(Object content) {
        this.content = content;
    }
}
