import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from './app.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly appService: AppService) {}

  @Cron(CronExpression.EVERY_SECOND)
  async testCron() {
    const report = await this.appService.getTicketReport();
    this.logger.debug(`Fetched report: ${JSON.stringify(report, null, 2)}`);
  }

  // @Cron('0 0 18 * * *', { timeZone: 'Asia/Bangkok' })
  //   async reportCron() {
  //       const reports = await this.appService.dailyReport();
  //       this.logger.debug(reports);
  //   }

}
