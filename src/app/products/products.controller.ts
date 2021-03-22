import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private productService: ProductsService
    ) {}

    @Get("/")
    async getMany(
        @Res() res: Response
    ) {
        try {
            const products = await this.productService.getMany();
            return res.status(200).json({ products })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    @Get("/:id")
    async getOne(
        @Res() res: Response,
        @Param("id") id: string
    ) {
       try {
           const product = await this.productService.getOne(id);
           return res.status(200).json({ product })
       } catch (error) {
           return res.status(500).json({ error })
       } 
    }
}
