import { Injectable } from '@nestjs/common';
import { ProductData, ProductDataType } from './products-data';

@Injectable()
export class ProductsService {
    public async getMany(): Promise<ProductDataType> {
        return ProductData()
    }

    public async getOne(id: string): Promise<any> {
        const result = ProductData().filter(res => {
            if (res._id == id) return res;
        })
        return result;
    }
}
