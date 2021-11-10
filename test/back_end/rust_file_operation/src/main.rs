use std::io;
use std::io::Write;
use std::path::Path;

fn main() {
    loop {
        print!("> ");
        io::stdout().flush().unwrap();

        let mut input = String::new();
        io::stdin().read_line(&mut input).unwrap();

        let cmd = input.trim();
        if cmd == "exit" {
            break;
        } else if cmd == "" {
            continue;
        }

        match get_command(cmd.to_string()) {
            Some(cmd) => cmd.execute(),
            None => println!("{}: command not found", cmd)
        }
    }
}

fn get_command(cmd: String) -> Option<Command> {
    let mut inputs: Vec<&str> = cmd.split(' ').collect();

    while inputs.len() < 3 {
        inputs.push("");
    }

    match inputs[0] {
        "ls" => Some(Command::Ls),
        "touch" => Some(Command::Touch(inputs[1].to_string())),
        "cat" => Some(Command::Cat(inputs[1].to_string())),
        "mkdir" => Some(Command::Mkdir(inputs[1].to_string())),
        "cp" => Some(Command::Cp(inputs[1].to_string(), inputs[2].to_string())),
        "mv" => Some(Command::Mv(inputs[1].to_string(), inputs[2].to_string())),
        "rm" => Some(Command::Rm(inputs[1].to_string())),
        _ => None
    }
}

enum Command {
    Ls,
    Touch(String),
    Cat(String),
    Mkdir(String),
    Cp(String, String),
    Mv(String, String),
    Rm(String),
}

impl Command {
    pub fn execute(&self) {
        match self {
            Command::Ls => Command::ls(),
            Command::Touch(path) => Command::touch(path.to_string()),
            Command::Cat(path) => Command::cat(path.to_string()),
            Command::Mkdir(path) => Command::mkdir(path.to_string()),
            Command::Cp(from, to) => Command::cp(from.to_string(), to.to_string()),
            Command::Mv(from, to) => Command::mv(from.to_string(), to.to_string()),
            Command::Rm(path) => Command::rm(path.to_string()),
        }
    }

    fn ls() {
        let path = Path::new(".");
        if !path.is_dir() {
            println!("{:?} is not directory", path);
            return;
        }

        let _dir = match path.read_dir() {
            Ok(dir) => dir,
            Err(e) => {
                println!("Error occur: {:?}", e.kind());
                return;
            }
        };

        println!("name\t\ttype\t\tpermission\t\tsize\tcreate time\t\taccess time\t\tmodify time");
        for file in _dir {
            // get file entry
            let _entry = match file {
                Ok(entry) => entry,
                Err(e) => {
                    println!("Error occur: {:?}", e.kind());
                    return;
                }
            };

            // get file metadata
            let metadata = match _entry.metadata() {
                Ok(metadata) => metadata,
                Err(e) => {
                    println!("Error occur: {:?}", e.kind());
                    continue;
                }
            };

            // name
            let name = String::from(_entry.file_name().to_str().unwrap_or("N/A"));
            print!("{}", name);
            match name.len() {
                0..=4 => print!("\t\t\t"),
                4..=9 => print!("\t\t"),
                _ => print!("\t")
            }
            // type
            if let Ok(ft) = _entry.file_type() {
                if ft.is_dir() {
                    print!("directory\t");
                } else if ft.is_file() {
                    print!("file\t\t");
                } else if ft.is_symlink() {
                    print!("symbol link\t");
                } else {
                    print!("N/A\t\t");
                }
            }
            // permission
            let p = metadata.permissions();
            if p.readonly() {
                print!("read only\t");
            } else {
                print!("read / write\t");
            }
            // size
            print!("{:?}\t", metadata.len());
            // create time
            // let create_time = metadata.created().unwrap_or(SystemTime::now());
            // print!("{:?}\t", create_time.format("%Y-%m-%d %T"));
            println!();
        }
    }

    fn touch(path: String) {
        println!("invoke touch {}", path);
    }

    fn cat(path: String) {
        println!("invoke cat {}", path);
    }

    fn mkdir(path: String) {
        println!("invoke mkdir {}", path);
    }

    fn cp(from: String, to: String) {
        println!("invoke cp {} {}", from, to);
    }

    fn mv(from: String, to: String) {
        println!("invoke mv {} {}", from, to);
    }

    fn rm(path: String) {
        println!("invoke rm {}", path);
    }
}