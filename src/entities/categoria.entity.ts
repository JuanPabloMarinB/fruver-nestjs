import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
/*
import { Producto } from './Producto';
*/

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreCategoria: string;
/*
  @OneToMany(() => Producto, producto => producto.categoria)
  productos: Producto[];
  */
}