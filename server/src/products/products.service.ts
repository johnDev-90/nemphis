import {
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateProductsDto } from './DTO/updateProducts.dto.js';
import { ProductsDto } from './DTO/products.dto.js';

import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload as S3Upload } from '@aws-sdk/lib-storage';
import multer, { memoryStorage } from 'multer';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAllProducts() {
    return await this.prisma.products.findMany();
  }

  async getProducts_byCat(id: number) {
    return await this.prisma.products.findMany({
      where: { categoryId: id },
    });
  }

  async createPoduct(data: ProductsDto, file) {
    const { originalname, buffer, mimetype } = file;

    console.log({
      region: process.env.myRegion,
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
    });

    if (
      !process.env.myRegion ||
      !process.env.AWS_ACCESS_KEY_ID ||
      !process.env.AWS_SECRET_ACCESS_KEY
    ) {
      throw new Error('Missing AWS environment variables');
    }

    const s3 = new S3Client({
      region: process.env.myRegion,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const storage = multer.memoryStorage();
    const Upload = multer({ storage });

    const key = `imagenes/${Date.now()}-${originalname}`;

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: key,
      Body: buffer,
      ContenType: mimetype,
    };

    const uploadCommand = new S3Upload({
      client: s3,
      params: uploadParams,
    });

    await uploadCommand.done();

    const imgUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.myRegion}.amazonaws.com/${key}`;

    console.log(imgUrl);

    try {
      return await this.prisma.products.create({
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          isActive: data.isActive,
          categoryId: data.categoryId,
          imgUrl: imgUrl,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id: number, updatedProduct: UpdateProductsDto) {
    const producExist = await this.prisma.products.findUnique({
      where: {
        id: id,
      },
    });

    if (!producExist)
      throw new NotFoundException(
        `Product with id: ${id} not found in Database`,
      );

    return this.prisma.products.update({
      where: { id: id },
      data: updatedProduct,
    });
  }

  async deleteProductById(id: number) {
    const producExist = await this.prisma.products.findUnique({
      where: { id: id },
    });
    if (!producExist)
      throw new NotFoundException(
        `Product with id: ${id} not found in Database`,
      );

    return this.prisma.products.delete({ where: { id: id } });
  }
}
