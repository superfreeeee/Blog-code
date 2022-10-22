pub struct Solution {}

impl Solution {
    pub fn max_profit_assignment(difficulty: Vec<i32>, profit: Vec<i32>, worker: Vec<i32>) -> i32 {
        let mut jobs = difficulty
            .into_iter()
            .zip(profit.into_iter())
            .collect::<Vec<_>>();
        let mut workers = worker;
        jobs.sort_unstable();
        workers.sort_unstable();

        let mut res = 0;
        let mut profit_of_job = 0;
        let mut job_index = 0;
        let jobs_len = jobs.len();
        for skill in workers {
            while job_index < jobs_len && skill >= jobs[job_index].0 {
                profit_of_job = profit_of_job.max(jobs[job_index].1);
                job_index += 1;
            }
            res += profit_of_job;
        }

        res
    }
}
