import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ticket-report')
  report() {
    return this.appService.generateChart();
  }
  @Get()
  @Render('chart') // corresponds to views/chart.hbs
  getChart() {
    return [
      { name: 'Alice', score: 80 },
      { name: 'Bob', score: 60 },
      { name: 'Charlie', score: 90 },
      { name: 'Denise', score: 70 },
      { name: 'Eric', score: 50 },
    ];
  }

}
