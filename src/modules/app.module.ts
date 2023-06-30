import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config';
import { productModule } from './productModule';
import { userModule } from './userModule';
import { Producto } from '../entities/producto.entity';
import { ProductService } from '../services/ProductService';
import { JwtAuthGuard } from '../modules/jwt-auth.guard';
import { Usuario } from '../entities/usuario.entity';
import { UserService } from '../services/UserService';
import { Repository } from 'typeorm';
import { Ventas } from '../entities/ventas.entity';
import { Categoria } from '../entities/categoria.entity';
import { productController } from '../controllers/productController';
import { userController } from '../controllers/userController';
import { AppService } from 'src/app.service';
import { AppController } from 'src/app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    productModule,
    userModule,
    TypeOrmModule.forFeature([Producto, Usuario, Ventas, Categoria]),
  ],
  controllers: [productController, userController, AppController],
  providers: [AppService, ProductService, JwtAuthGuard, UserService, Repository],
})
export class AppModule {}
