import { Module } from '@nestjs/common';
import { userController } from '../controllers/userController';
import { UserService } from '../services/UserService';
import { Usuario } from '../entities/usuario.entity';

@Module({
  controllers: [userController],
  providers: [UserService],
  imports: [Usuario], // Importa la entidad de Usuario
})
export class userModule {}
