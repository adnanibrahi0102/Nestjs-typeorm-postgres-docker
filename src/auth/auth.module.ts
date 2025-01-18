import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaModule } from 'prisma/prisma.module';
import { EmailService } from 'utils/email.service';

@Module({
  imports: [PrismaModule],
  providers: [AuthResolver, AuthService, EmailService],
})
export class AuthModule {}
