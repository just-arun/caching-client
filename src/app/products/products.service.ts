import { Injectable } from '@nestjs/common';
import { ProductData, ProductDataType } from './products-data';

@Injectable()
export class ProductsService {
    public async getMany(): Promise<any> {
        return ProductData().map(res => res.seo);
    }

    public async getOne(id: string, metadata: boolean): Promise<any> {
        const result = ProductData().filter(res => {
            if (res._id == id) {
                if (metadata) {
                    return res.seo;
                } return res;
            }
        })
        return result;
    }
}
