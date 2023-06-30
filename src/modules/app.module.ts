import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config';
import { productModule } from './productModule';
import { userModule } from './userModule';
import { Producto } from '../entities/producto';
import { ProductService } from '../services/ProductService';
import { JwtAuthGuard } from '../modules/jwt-auth.guard';
import { Usuario } from '../entities/usuario';
import { UserService } from '../services/UserService';
import { Repository } from 'typeorm';
import { Ventas } from '../entities/ventas';
import { Categoria } from '../entities/categoria';
import { productController } from '../controllers/productController';
import { userController } from '../controllers/userController';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    productModule,
    userModule,
    TypeOrmModule.forFeature([Producto, Usuario, Ventas, Categoria]),
  ],
  controllers: [productController, userController],
  providers: [ProductService, JwtAuthGuard, UserService, Repository],
})
export class AppModule {}
