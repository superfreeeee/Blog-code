use std::cell::RefCell;

trait Messenger {
    fn send(&self, message: &str);
}

#[derive(Debug)]
struct MockMessenger {
    send_messages: RefCell<Vec<String>>,
}

impl MockMessenger {
    fn new() -> MockMessenger {
        MockMessenger {
            send_messages: RefCell::new(vec![])
        }
    }
}

impl Messenger for MockMessenger {
    fn send(&self, message: &str) {
        let mut mut_sm = self.send_messages.borrow_mut();
        mut_sm.push(String::from(message));
        drop(mut_sm);
        println!("receive message = {:?}", self.send_messages.borrow());
    }
}

pub fn test() {
    println!(">>>>> test reference_cell");

    let mock_messenger = MockMessenger::new();
    mock_messenger.send("Hello");
    mock_messenger.send("World");
    println!("mock_messenger = {:?}", mock_messenger);
    println!("mock_messenger len = {}", mock_messenger.send_messages.borrow().len());

    println!();
}