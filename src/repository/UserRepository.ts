import { Repository, EntityRepository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {
  findByEmail(email: string): Promise<Usuario> {
    return this.findOne({ where: { email } });
  }
}
