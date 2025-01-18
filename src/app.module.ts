import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { registerEnumType } from '@nestjs/graphql';
import { userRole } from '@prisma/client';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/jwt-auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';

// Register the Enum here
registerEnumType(userRole, {
  name: 'UserRole',
  description: 'User roles in the system',
});
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      introspection: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  constructor() {
    console.log('connect');
  }
}
