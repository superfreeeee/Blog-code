// interface Shape {
//   kind: 'circle' | 'square';
//   radius?: number;
//   sideLength?: number;
// }

interface Circle {
  kind: 'circle';
  radius: number;
}

interface Square {
  kind: 'square';
  sideLength: number;
}

interface Triangle {
  kind: 'triangle';
  sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      // (parameter) shape: Circle
      return Math.PI * shape.radius ** 2;
    case 'square':
      // (parameter) shape: Square
      return shape.sideLength ** 2;




    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;

    case 'triangle':
      return shape.sideLength * 3;
  }
  console.log('Un-reachable');
}
