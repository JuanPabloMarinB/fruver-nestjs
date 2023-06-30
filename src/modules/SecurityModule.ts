import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../services/UserService';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'yourSecretKey', // Cambia esto por tu clave secreta
      signOptions: { expiresIn: '1d' }, // Cambia esto según tus necesidades
    }),
  ],
  providers: [UserService, JwtStrategy, JwtAuthGuard],
  exports: [PassportModule],
})
export class SecurityModule {}
