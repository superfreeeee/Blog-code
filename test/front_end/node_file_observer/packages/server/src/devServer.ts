import expressWs from 'express-ws';
import path from 'path';
import { webpack } from 'webpack';
import monitor from './components/monitor';
import { ComponentsMonitorEventType } from './components/type';

let monitorReady = false;
const componentsMap = new Map();

monitor
  .on(ComponentsMonitorEventType.Ready, () => {
    console.log(`monitor ready`);
    monitorReady = true;
    console.log(`componentsMap`, componentsMap);
  })
  .on(ComponentsMonitorEventType.CreateComponent, ({ componentName }) => {
    console.log(`create ${componentName}`);
    componentsMap.set(componentName, {
      sourcePath: path.resolve(__dirname, componentName),
    });
    if (monitorReady) {
    }
  })
  .on(ComponentsMonitorEventType.RemoveComponent, ({ componentName }) => {
    console.log(`remove ${componentName}`);
    componentsMap.delete(componentName);
    if (monitorReady) {
    }
  });

const useMiddleware = (app: expressWs.Router) => {
  const baseConfig = require('../webpack.config.base');

  console.log(`baseConfig`, baseConfig);

  // const compiler = webpack(baseConfig);

  // // Step 2: Attach the dev middleware to the compiler & the server
  // app.use(
  //   require('webpack-dev-middleware')(compiler, {
  //     publicPath: baseConfig.output.publicPath,
  //   })
  // );

  // // Step 3: Attach the hot middleware to the compiler & the server
  // app.use(
  //   require('webpack-hot-middleware')(compiler, {
  //     log: console.log,
  //     path: '/__webpack_hmr',
  //     heartbeat: 10 * 1000,
  //   })
  // );
};

export { useMiddleware };
