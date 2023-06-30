import { EntityRepository, Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';

@EntityRepository(Producto)
export class ProductoRepository extends Repository<Producto> {
  async findByNombre(nombre: string): Promise<Producto> {
    return this.findOne({ where: { nombre } });
  }
}
