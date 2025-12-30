import { Body, ConflictException, Injectable, NotFoundException, Param, Put } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateProductsDto } from './DTO/updateProducts.dto.js';
import { ProductsDto } from './DTO/products.dto.js';

@Injectable()
export class ProductsService {
    constructor(private prisma : PrismaService){}

    async findAllProducts(){
     return await this.prisma.products.findMany()
    }

    async getProducts_byCat(id:number){

        return await this.prisma.products.findMany({
            where:{categoryId:id}
        })

    }

   async createPoduct(data:ProductsDto){
        try {

            return await this.prisma.products.create({data})

        } catch (error) {
            console.log(error)
        }
        
    }

    async updateProduct(id:number, updatedProduct:UpdateProductsDto){

  
          const producExist = await this.prisma.products.findUnique({where:{
            id:id
          }})

          if(!producExist) throw new NotFoundException(`Product with id: ${id} not found in Database`)

          return this.prisma.products.update({
            where:{id:id},
            data:updatedProduct
          });
        
    }

    async deleteProductById(id:number){
        const producExist = await this.prisma.products.findUnique({where:{id:id}});
        if(!producExist) throw new NotFoundException(`Product with id: ${id} not found in Database`);

        return this.prisma.products.delete({where:{id:id}})
    
    }

  
}
