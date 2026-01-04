import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.hostinger.com',
        port: 587,
        secure: false,
        debug: true,
        connectionTimeout: 10000,
        auth: {
          user: 'lt-mechanic@bca-daily.com',
          pass: '@Manozaga0',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
