export interface Component {}

export interface Product {
  componentA?: Component
  componentB?: Component
  componentC?: Component
}

export class ComponentA implements Component {}
export class ComponentB implements Component {}
export class ComponentC implements Component {}
