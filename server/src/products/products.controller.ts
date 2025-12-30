import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsDto } from './DTO/products.dto.js';
import { UpdateProductsDto } from './DTO/updateProducts.dto.js';

@Controller('products')
export class ProductsController {
    constructor(private product : ProductsService){}
    

    @Get()
    findAllProducts(){
        return this.product.findAllProducts();
    }

    @Get(':id')
    getProductsByCategories(@Param('id', ParseIntPipe) id:number){
        return this.product.getProducts_byCat(id)

    }


    @Post()
    createNewProduct(@Body() data : ProductsDto){
       return this.product.createPoduct(data)
    }

    @Put(':id')
       updateProductbyId(@Param('id',ParseIntPipe) id:number, @Body() updatedProduct:UpdateProductsDto){
      return this.product.updateProduct(id, updatedProduct)
    }

    @Delete(':id')
    deleteProduct(@Param('id',ParseIntPipe) id:number){
        return this.product.deleteProductById(+id)
    }
}
