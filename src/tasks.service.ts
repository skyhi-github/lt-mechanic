import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from './app.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly appService: AppService) {}

//   @Cron(CronExpression.EVERY_SECOND)
//   async handleCron() {
//     const accessToken = await this.appService.getAccessToken();
//     this.logger.debug(`Fetched access token: ${JSON.stringify(accessToken, null, 2)}`);
//   }

    @Cron(CronExpression.EVERY_SECOND)
    async handleCron() {
        const reports = await this.appService.dailyReport();
        this.logger.debug(reports);
    }

}
