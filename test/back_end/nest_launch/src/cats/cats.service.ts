import { Injectable } from '@nestjs/common';
import { Cat } from './interface/cat.interface';

const initCats: Cat[] = [
  { name: 'A', age: 1, breed: '???' },
  { name: 'A', age: 1, breed: '???' },
];

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = initCats;

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
