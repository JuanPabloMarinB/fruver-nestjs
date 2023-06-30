import { Module } from '@nestjs/common';
import { productController } from '../controllers/productController';
import { ProductService } from '../services/ProductService';
import { Producto } from '../entities/producto';

@Module({
  controllers: [productController],
  providers: [ProductService],
  imports: [Producto],
})
export class productModule {}
