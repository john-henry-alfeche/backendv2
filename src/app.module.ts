import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/core/authentication.module';
import { RequestLetterModule } from './request-letters/core/request-letters.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '192.168.137.12',
      port: 1433,
      username: 'sa',
      password: 'Abcd123!',
      database: 'GSCWD_TWMS',
      synchronize: false,
      retryAttempts: 10,
      retryDelay: 3000,
      autoLoadEntities: false,
      logging: true,
      options: {
        encrypt: false,
      },
    }),
    AuthenticationModule,
    RequestLetterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
