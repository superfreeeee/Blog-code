use std::fmt::Debug;
use std::thread;
use std::sync::{Arc, mpsc, Mutex};

pub struct ThreadPool {
    workers: Vec<Worker>,
    sender: mpsc::Sender<Job>,
}

impl ThreadPool {
    pub fn new(size: usize) -> Self {
        assert!(size > 0);

        let (sender, receiver) = mpsc::channel();

        let receiver = Arc::new(Mutex::new(receiver));

        let mut workers = Vec::with_capacity(size);

        for i in 0..size {
            workers.push(Worker::new(i, Arc::clone(&receiver)));
        }


        ThreadPool {
            workers,
            sender,
        }
    }

    pub fn execute<F>(&self, f: F) where F: FnOnce() + Send + 'static {
        let job = Box::new(f);
        self.sender.send(job).unwrap();
    }
}

pub struct Worker {
    id: usize,
    thread: thread::JoinHandle<()>,
}

impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {
        let thread = thread::spawn(move || {
            loop {
                println!("Worker({}) is waiting ...", id);

                let job = receiver.lock().unwrap().recv().unwrap();

                println!("Worker({}) recive a Job to do.", id);

                job();

                println!("Worker({}) finished.", id);
            }
        });

        Worker {
            id,
            thread,
        }
    }
}

type Job = Box<dyn FnOnce() + Send + 'static>;
