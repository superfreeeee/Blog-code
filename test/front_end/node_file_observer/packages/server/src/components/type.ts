export enum ComponentsMonitorEventType {
  Ready = 'ready',
  CreateComponent = 'create-component',
  RemoveComponent = 'remove-component',
  HeartBeat = 'heart-beat',
}

export class ComponentsMonitorEvent {
  type: ComponentsMonitorEventType;
  componentName?: string;

  constructor(type: ComponentsMonitorEventType, componentName?: string) {
    this.type = type;
    this.componentName = componentName;
  }
}

export interface ComponentsMonitorCallback {
  (event: ComponentsMonitorEvent): void;
}
