package top.csdnb.be.demo;

import org.springframework.web.bind.annotation.*;
import top.csdnb.be.common.Response;

@RestController
@RequestMapping("/demo")
@CrossOrigin("*")
public class DemoController {

    @GetMapping("/hello")
    public Response hello() {
        return Response.buildFailure("Hello World!");
    }

    @GetMapping("/hi")
    public Response hi(@RequestParam("name") String name) {
        return Response.buildSuccess("Hi " + name + "!");
    }
}
