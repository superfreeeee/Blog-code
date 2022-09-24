import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CatsService } from './cats.service';
import CreateCatDto from './dto/create-cat.dto';
import { Cat } from './interface/cat.interface';

@Controller('/cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('/cats')
  async innerFindAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
