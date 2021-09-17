import { repeat, Log } from 'webpack_library_3';

export default function run() {
  Log.log(`repeat('123', 3) = ${repeat('123', 3)}`);
}
