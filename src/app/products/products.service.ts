import { Injectable } from '@nestjs/common';
import { ProductData, ProductDataType } from './products-data';

@Injectable()
export class ProductsService {
  public async getMany(): Promise<any> {
    return ProductData().map((res) => this.leanData(res));
  }

  public async getOne(id: string, metadata?: boolean): Promise<any> {
    const result = ProductData()
      .filter((res) => {
        if (res._id == id) {
          return res;
        }
      })
      .map((res) => {
        if (!!metadata) {
          return {
            ...res.seo,
            media: res.media,
            model: res.model,
            specifications: res.specifications,
          };
        } else {
          return res;
        }
      });
    return typeof result[0] != 'undefined' ? result[0] : {};
  }

  private getStorage(obj) {
    return obj
      .filter((res) => {
        if (res.code == 'storage') return res;
      })
      .map((res) => res.values)[0]
      .map((res) => res.name);
  }

  private getColor(colorObj) {
    return colorObj
      .filter((res) => {
        if (res.code == 'color') return res;
      })
      .map((res) => res.values)[0]
      .map((obj) => obj.code);
  }

  private leanData(res: any) {
    const getImgUrl = (imgObj) => imgObj.map((img) => img.url);
    return {
      _id: res._id,
      brand: res.brand,
      code: res.code,
      isActive: res.isActive,
      images: getImgUrl(res.media.image_gallery),
      color: this.getColor(res.model.variant_attr_scheme),
      storage: this.getStorage(res.model.variant_attr_scheme),
      name: res.name,
      seo: res.seo,
      description: res.description,
    };
  }
}
