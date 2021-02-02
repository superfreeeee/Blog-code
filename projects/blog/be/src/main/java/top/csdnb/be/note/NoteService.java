package top.csdnb.be.note;

import org.springframework.web.multipart.MultipartFile;
import top.csdnb.be.note.pojo.NoteBO;

public interface NoteService {

    /**
     * 上传文件接口
     * @param file
     * @return
     */
    NoteBO uploadFile(MultipartFile file);

    /**
     * 获取文件
     * @param path
     * @return
     */
    NoteBO getFile(String path);
}
