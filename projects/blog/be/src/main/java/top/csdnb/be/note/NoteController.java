package top.csdnb.be.note;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import top.csdnb.be.common.Response;
import top.csdnb.be.note.pojo.NoteBO;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/note")
@CrossOrigin("*")
public class NoteController {

    @Autowired
    private NoteService noteService;

    /**
     * 文件上传
     * @return
     */
    @PostMapping("/upload")
    public Response upload(@RequestBody MultipartFile file) {
        NoteBO res = noteService.uploadFile(file);
        return res.toResponse();
    }

    /**
     * 查看 Note 可用接口
     * @return
     */
    @GetMapping("")
    public Response options() {
        Map<String, String> options = new HashMap<>();
        options.put("upload", "/upload");
        return Response.buildSuccess(options);
    }
}
