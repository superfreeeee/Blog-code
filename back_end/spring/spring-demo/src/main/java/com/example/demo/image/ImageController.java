package com.example.demo.image;

import com.example.demo.vo.ResponseVO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/img")
@CrossOrigin("http://localhost:8081")
public class ImageController {

    private int id = 0;

    @PostMapping("/upload")
    public ResponseVO upload(@RequestBody MultipartFile file) throws IOException {
        System.out.println(file.getOriginalFilename());
        System.out.println(file.getSize());

        String subffix = file.getOriginalFilename().split("\\.")[1];
//        String dirPath = System.getProperty("user.dir") + "/src/main/resources/files";
        String dirPath = System.getProperty("user.dir") + "tmp";
        System.out.println(dirPath);
        File dir = new File(dirPath);
        if(!dir.exists()) {
            dir.mkdir();
        }

        file.transferTo(new File(dir + "/upload_" + (++id) + "." + subffix));
        return ResponseVO.buildSuccess();
    }

    @Value("upload-path")
    private String uploadPath;

//    @Value("resources.static-locations.file")
    private String filePath;

//    @Value("file")
    private String filePath2;

    @GetMapping("/url")
    public ResponseVO showURL() {
        Map<String, String> urlMap = new HashMap<>();
        urlMap.put("user.dir", System.getProperty("user.dir"));
        urlMap.put("direct", "/root/files");
        urlMap.put("static:upload-path", uploadPath);
        urlMap.put("static:resources.static-locations.file", filePath);
        urlMap.put("static:file", filePath2);

        return ResponseVO.buildSuccess(urlMap);
    }
}
