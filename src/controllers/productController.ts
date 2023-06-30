import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { Producto } from '../entities/producto.entity';
import { ProductService } from '../services/ProductService';
import { CrearProductoDto } from 'src/entities/dto/producto.dto';

@Controller('producto')
export class productController {
  constructor(private readonly productoService: ProductService) {}

  @Get()
  async getProducts() {
    const products = await this.productoService.getProducts();
    return products;
  }

  @Get(':id')
  getProductoById(@Param('id') id: number): Promise<Producto> {
    return this.productoService.findById(id);
  }

  @Post('crear')
  async crearProducto(@Body() newProducto: CrearProductoDto) {
    return this.productoService.crearProducto(newProducto);
  }

  @Post('create')
  createProducto(@Body() producto: Producto): Promise<Producto> {
    return this.productoService.create(producto);
  }

  @Put(':id')
  updateProducto(
    @Param('id') id: number,
    @Body() producto: Producto,
  ): Promise<void> {
    return this.productoService.update(id, producto);
  }

  @Delete(':id')
  deleteProducto(@Param('id') id: number): Promise<void> {
    return this.productoService.delete(id);
  }

  @Get('portal')
  getHome(): string {
    // Código para retornar la vista de inicio (index.html) del portal
    return 'index.html';
  }

  @Get('create')
  getCreate(): string {
    // Código para retornar la vista de creación (crear.html) de un producto
    return 'crear.html';
  }

  @Post('save')
  saveProducto(@Body() producto: Producto): String {
    // Código para guardar el producto y redireccionar a la página principal (index.html)
    return 'index.html';
  }

  @Get('editar/:id')
  editProducto(@Param('id') id: number): string {
    // Código para obtener el producto por su id, agregarlo al modelo y retornar la vista de edición (index.html)
    return 'index.html';
  }

  @Get('producto/:id')
  getProducto(@Param('id') id: number): string {
    // Código para obtener el producto por su id, agregarlo al modelo y retornar la vista de detalle (index.html)
    return 'index.html';
  }

  @Get('registro')
  registerProducto(): string {
    // Código para retornar la vista de registro (registro.html) de un producto
    return 'registro.html';
  }

  @Post('registro')
  registrarProducto(@Body() producto: Producto): string {
    // Código para registrar un producto y redireccionar a la página de inicio (inicio.html)
    return 'redirect:/inicio';
  }

  @Get('registrar-venta')
  registrarVenta(): string {
    // Código para registrar una venta y redireccionar a la página principal (index.html)
    return 'redirect:/index';
  }

  @Get('mostrar-inventario')
  async mostrarInventario(@Res() res: any): Promise<void> {
    const productos = await this.productoService.findAll();
    res.render('inventario', { productos }); // Renderiza la vista 'inventario' con los datos del modelo
  }

  @Get('products')
  async mostrarProductos(@Res() res: any): Promise<void> {
    const productos = await this.productoService.findAll();
    res.render('index', { producto: productos, mostrarProductos: true });
  }

  @Get('sales')
  async mostrarVentas(@Res() res: any): Promise<void> {
    const productos = await this.productoService.findAll();
    res.render('index', { producto: productos, mostrarVentas: true });
  }
}
