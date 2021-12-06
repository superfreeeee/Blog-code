import process from 'node:process';
import onetime from 'onetime';
import signalExit from 'signal-exit';

/**
 * exit 退出时恢复游标
 */
// ? Read
const restoreCursor = onetime(() => {
  signalExit(
    () => {
      process.stderr.write('\u001B[?25h'); // esc [ ? 25h
    },
    { alwaysLast: true }
  );
});

export default restoreCursor;
