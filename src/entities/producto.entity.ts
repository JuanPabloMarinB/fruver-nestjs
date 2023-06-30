import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
/*
import { Categoria } from './categoria';
import { Ventas } from './ventas';
*/
@Entity({ name: 'productos' })
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  cantidadIngresada: number;

  @Column()
  costoXcantidad: number;

  @Column()
  fechaIngreso: Date;

  @Column()
  cantidadVenta: number;

  @Column()
  precioVenta: number;

  @Column()
  fechaInventario: Date;

  @Column()
  cantidadActual: number;

  @Column()
  avisoReposicion: boolean;

  @Column()
  codigoBarra: number;

  @Column()
  imagen: string;
  /*
  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria: Categoria;

  @ManyToOne(() => Ventas, (ventas) => ventas.productos)
  ventas: Ventas;
*/
  @Column()
  activo: boolean;
}
