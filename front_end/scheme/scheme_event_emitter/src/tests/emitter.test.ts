import EventEmitter from '../emitter';

export enum EventEmitterEvent {
  EventA = 'EventA',
  EventB = 'EventB',
}

const emitter = new EventEmitter<EventEmitterEvent>();

const listenerA1 = () => {
  console.log('listenerA1 listen for EventEmitterEvent.EventA');
};

const listenerA2 = () => {
  console.log('listenerA2 listen for EventEmitterEvent.EventA');
};

const listenerB1 = () => {
  console.log('listenerB1 listen for EventEmitterEvent.EventB');
};

const listenerB2 = () => {
  console.log('listenerB2 listen for EventEmitterEvent.EventB');
};

console.group('>>>>> group 1');
emitter.on(EventEmitterEvent.EventA, listenerA1);
console.log('[log] on listenerA1');
emitter.on(EventEmitterEvent.EventA, listenerA2);
console.log('[log] on listenerA2');
emitter.on(EventEmitterEvent.EventB, listenerB1);
console.log('[log] on listenerB');
emitter.once(EventEmitterEvent.EventB, listenerB2);
console.log('[log] once listenerB2');
console.log('emitter info', emitter);

console.log('[log] invoke EventA');
emitter.emit(EventEmitterEvent.EventA);
console.log('[log] invoke EventB');
emitter.emit(EventEmitterEvent.EventB);

console.log('emitter info', emitter);
console.groupEnd();

console.group('>>>>> group 2');
emitter.off(EventEmitterEvent.EventA, listenerA1);
console.log('[log] off listenerA1');
console.log('emitter info', emitter);

console.log('[log] invoke EventA');
emitter.emit(EventEmitterEvent.EventA);
console.log('[log] invoke EventB');
emitter.emit(EventEmitterEvent.EventB);
console.groupEnd();
