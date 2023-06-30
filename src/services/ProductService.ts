import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';
import { NombreInvalidoException } from '../exceptions/product/NombreInvalidoException';
import { PrecioInvalidoException } from '../exceptions/product/PrecioInvalidoException';
import { CantidadInvalidoException } from '../exceptions/product/CantidadInvalidoException';
import { FechaInvalidoException } from '../exceptions/product/FechaInvalidoException';
import { CrearProductoDto } from 'src/entities/dto/producto.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async getProducts() {
    return this.productoRepository.find();
  }

  async crearProducto(producto: CrearProductoDto) {
    try {
      const newProducto = this.productoRepository.create(producto);
      return this.productoRepository.save(newProducto);
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw error; // Lanza el error para que sea manejado en otro lugar si es necesario
    }
  }

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find();
  }

  async findById(id: number): Promise<Producto> {
    return this.productoRepository.findOne({ where: { id } });
  }

  async update(id: number, producto: Producto): Promise<void> {
    await this.productoRepository.update(id, producto);
  }

  async create(producto: Producto): Promise<Producto> {
    return this.productoRepository.save(producto);
  }

  async delete(id: number): Promise<void> {
    await this.productoRepository.delete(id);
  }

  async save(producto: Producto): Promise<Producto> {
    return this.productoRepository.save(producto);
  }

  async registrar(
    nombre: string,
    precio: number,
    cantidad: number,
    fechaInventario: Date,
  ): Promise<void> {
    this.validar(nombre, precio, cantidad, fechaInventario);

    const producto = new Producto();
    producto.nombre = nombre;
    producto.precioVenta = precio;
    producto.cantidadVenta = cantidad;
    producto.fechaInventario = fechaInventario;

    await this.productoRepository.save(producto);
  }

  private validar(
    nombre: string,
    precio: number,
    cantidad: number,
    fechaInventario: Date,
  ): void {
    if (!nombre || nombre.trim() === '') {
      throw new NombreInvalidoException();
    }
    if (isNaN(precio) || precio <= 0) {
      throw new PrecioInvalidoException();
    }
    if (isNaN(cantidad) || cantidad <= 0) {
      throw new CantidadInvalidoException();
    }
    if (
      !(fechaInventario instanceof Date) ||
      isNaN(fechaInventario.getTime())
    ) {
      throw new FechaInvalidoException();
    }
  }

  async registrarVenta(
    producto: string,
    cantidadVendida: number,
  ): Promise<void> {
    const productoExistente = await this.productoRepository.findOne({
      where: { nombre: producto },
    });

    if (productoExistente) {
      const cantidadDisponible = productoExistente.cantidadVenta;

      if (cantidadVendida <= cantidadDisponible) {
        productoExistente.cantidadVenta = cantidadDisponible - cantidadVendida;
        await this.productoRepository.save(productoExistente);
        console.log(
          'Venta registrada correctamente. Actualización del inventario realizada.',
        );
      } else {
        console.log('No hay suficiente cantidad de producto en el inventario.');
      }
    } else {
      console.log('Producto no encontrado en el inventario.');
    }
  }

  async mostrarInventario(): Promise<void> {
    const inventario = await this.productoRepository.find();
    console.log('***** Inventario *****');
    inventario.forEach((producto) => {
      console.log(`${producto.nombre}: ${producto.cantidadVenta}`);
    });
    console.log();
  }
}
