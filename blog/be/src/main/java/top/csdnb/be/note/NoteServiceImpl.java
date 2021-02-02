package top.csdnb.be.note;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import top.csdnb.be.note.pojo.NoteBO;

import java.io.File;
import java.io.IOException;

@Service
public class NoteServiceImpl implements NoteService {
    /**
     * 上传文件接口
     *
     * @param file
     * @return
     */
    @Override
    public NoteBO uploadFile(MultipartFile file) {
//        File dir = new File(userDir + "/tmp");
        File dir = genDir( "/blog/file");
        String fileName = file.getOriginalFilename();

        System.out.println("file name  : " + fileName);
        System.out.println("size       : " + file.getSize());
        System.out.println("dir        : " + dir);
        System.out.println("dir exists : " + dir.exists());

        File target = new File(dir + "/" + fileName);
        System.out.println("target     : " + target);

        try {
            file.transferTo(target);
        } catch (IOException e) {
            System.out.println("save fail");
            e.printStackTrace();
            return new NoteBO(false, "upload fail");
        }

        return new NoteBO(true, "upload success");
    }

    public File genDir(String path) {
        String userDir = System.getProperty("user.dir");
//        System.out.println("generate " + path);
        String[] paths = path.substring(1).split("/");

        File dir = new File(userDir);
        for(String p : paths) {
//            System.out.println(dir + "/" + p);
            dir = new File(dir + "/" + p);
            if(!dir.exists()) {
//                System.out.println("make");
                dir.mkdir();
            }
        }
        return dir;
    }

    /**
     * 获取文件
     *
     * @param path
     * @return
     */
    @Override
    public NoteBO getFile(String path) {
        return new NoteBO(true, null);
    }
}
