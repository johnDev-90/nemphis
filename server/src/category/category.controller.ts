import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { get } from 'http';
import { updateCatDto } from './DTO/updateCate.dto.js';
import { createCatDto } from './DTO/createCat.dto.js';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategorys(){
    return this.categoryService.getCategoriesFromDb()
  }

  @Post()
  createNewCategory(@Body() data:createCatDto){
    return this.categoryService.create_category(data);

  }

  @Put(':id')
  async updateCategory(@Param('id',ParseIntPipe) id:number, @Body() data : updateCatDto){
    return this.categoryService.update_category(id,data)

  }

  @Delete(':id')
  deleteCategory(@Param('id') id:number){

    return this.categoryService.deleteCategory_fromDb(id);

  }
}
