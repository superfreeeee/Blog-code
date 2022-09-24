import chokidar from 'chokidar';
import path from 'path';

import {
  ComponentsMonitorCallback,
  ComponentsMonitorEvent,
  ComponentsMonitorEventType as ComponentsMonitorEventType,
} from './type';

const isComponentDir = (_path: string): boolean => {
  const relative = path.relative(componentsRootPath, _path);
  return relative && !relative.includes(path.sep) && path.extname(_path) === '';
};

class ComponentsMonitor {
  private listenerMap: Map<
    ComponentsMonitorEventType,
    Set<ComponentsMonitorCallback>
  > = new Map();
  private watcher: chokidar.FSWatcher;

  constructor(componentsRootPath: string) {
    const componentsWatcher = (this.watcher =
      chokidar.watch(componentsRootPath));

    componentsWatcher
      .on('ready', () => {
        this.emit(ComponentsMonitorEventType.Ready);
      })
      .on('addDir', (_path, stats) => {
        if (isComponentDir(_path)) {
          const componentName = path.basename(_path);
          this.emit(ComponentsMonitorEventType.CreateComponent, componentName);
        }
      })
      .on('unlinkDir', (_path) => {
        if (isComponentDir(_path)) {
          const componentName = path.basename(_path);
          this.emit(ComponentsMonitorEventType.RemoveComponent, componentName);
        }
      });
  }

  private getListeners(
    type: ComponentsMonitorEventType
  ): Set<ComponentsMonitorCallback> {
    return this.listenerMap[type] || (this.listenerMap[type] = new Set());
  }

  on(type: ComponentsMonitorEventType, cb: ComponentsMonitorCallback) {
    this.getListeners(type).add(cb);
    return this;
  }

  off(type: ComponentsMonitorEventType, cb: ComponentsMonitorCallback) {
    this.getListeners(type).delete(cb);
    return this;
  }

  emit(type: ComponentsMonitorEventType, componentName?: string) {
    const event = new ComponentsMonitorEvent(type, componentName);

    this.getListeners(type).forEach((cb) => {
      cb(event);
    });
  }

  close() {
    this.watcher.close();
  }
}

const componentsRootPath = path.resolve(__dirname);

const monitor = new ComponentsMonitor(componentsRootPath);

export default monitor;
