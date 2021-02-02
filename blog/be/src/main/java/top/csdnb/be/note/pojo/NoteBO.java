package top.csdnb.be.note.pojo;

import top.csdnb.be.common.Response;

public class NoteBO {

    private boolean success;

    private Object content;

    public NoteBO(boolean success, Object content) {
        this.success = success;
        this.content = content;
    }

    public Response toResponse() {
        return Response.build(success, content);
    }

    public boolean isSuccess() {
        return success;
    }

    public Object getContent() {
        return content;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setContent(Object content) {
        this.content = content;
    }
}
