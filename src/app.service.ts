/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { formatDate } from './util/helper';
import e from 'express';
interface LoginRequest {
  companyCode: string;
  username: string;
  password: string;
}

const loginData: LoginRequest = {
  companyCode: 'BCA',
  username: '007902',
  password: 'manozaga0',
};

const employee_name = [
  { name: 'SOEUN SARY', id: '006369' },
  { name: 'TOCH TAG', id: '006891' },
  { name: 'SOEUN PREP', id: '007324' },
  { name: 'SOM SOK KAING', id: '007325' },
  { name: 'MON PICH', id: '007326' },
  { name: 'WANG YI JUN', id: 'CH0165' },
  { name: 'ORL KOSAL', id: 'CP0016' },
  { name: 'Ros Phally', id: 'M00010' },
  { name: 'CHEA PHOEURN', id: 'M00016' },
  { name: 'SOEUN THOEUN', id: 'M00017' },
  { name: 'DUL PHANIT', id: 'M00018' },
  { name: 'YIM CHANDARA', id: 'M00023' },
  { name: 'KHORN PISETH', id: 'M00026' },
  { name: 'ROS VISAL', id: 'M00033' },
  { name: 'RIN PHEARAK', id: 'M00039' },
  { name: 'PON SOTHA', id: 'M00043' },
  { name: 'KAK HOEURN', id: 'M00044' },
  { name: 'ORM TEM', id: 'M00046' },
  { name: 'CHIN VUTHY', id: 'M00054' },
  { name: 'YEM SREY', id: 'M00055' },
  { name: 'KON VISAL', id: 'M00059' },
  { name: 'THEA RITH', id: 'M00063' },
  { name: 'DIM SOKLANG', id: 'M00065' },
  { name: 'KHEAV SOKEA', id: 'M00067' },
  { name: 'BIN SOKEA', id: 'M00069' },
  { name: 'CHIN POLORK', id: 'M00073' },
  { name: 'SENG CHANTETH', id: 'M00075' },
  { name: 'CON CAN', id: 'M00076' },
  { name: 'SAN KOSAL', id: 'M00077' },
  { name: 'SEANG VICHET', id: 'M00081' },
  { name: 'OUN SOPHA', id: 'M00085' },
  { name: 'CHEV PHEAREAK', id: 'M00086' },
  { name: 'TOM THAVY', id: 'M00088' },
  { name: 'MEN MAKARA', id: 'N00095' },
];

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  async getAccessToken() {
    const response = await axios.post(
      'https://bca.ltlabs.co/msv/global-admin/api/v1/company/userlogin',
      loginData,
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );
    return response.data;
  }

  async getTicketReport() {
    const accessToken = await this.getAccessToken();

    const repair_tickets = axios.get(
      'https://bca-ltm.ltlabs.co/msv/tickets/api/tickets',
      {
      params: {
      pageSize: 10,
      currentPage: 1,
      reportedDt: `${formatDate(new Date())}~${formatDate(new Date())}`,
      ticketType: 'r',
      status: 17168,
      sort: 'a.reportedDt',
      sortDirection: 'desc',
        },
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8,km;q=0.7',
          Authorization: `Bearer ${accessToken.accessToken}`,
          'Cache-Control': 'no-cache',
          Cookie:
            '_gcl_au=1.1.1403546763.1731925210; _hjSessionUser_2572333=eyJpZCI6IjQ0NTEyMjY1LTc1ZGMtNWRlZi04MzMwLTliNDhlZmRmMDZmZiIsImNyZWF0ZWQiOjE3MzE5MjUyMTIzOTcsImV4aXN0aW5nIjp0cnVlfQ==; _ga=GA1.1.1665779777.1731925210; _ga_Y8STE1XM07=GS1.1.1731925209.1.1.1731926457.57.0.0',
          DNT: '1',
          Language: 'null',
          Pragma: 'no-cache',
          Priority: 'u=1, i',
          Referer: 'https://bca-ltm.ltlabs.co/tickets',
          'Sec-Ch-Ua':
            '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'Sec-Ch-Ua-Mobile': '?1',
          'Sec-Ch-Ua-Platform': '"Android"',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
        },
      },
    );

    const maintenance_tickets = axios.get(
      'https://bca-ltm.ltlabs.co/msv/tickets/api/tickets',
      {
        params: {
          pageSize: 1000,
          currentPage: 1,
          reportedDt: `${formatDate(new Date())}~${formatDate(new Date())}`,
          ticketType: 'm',
          status: 17192,
          sort: 'a.reportedDt',
          sortDirection: 'desc',
        },
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8,km;q=0.7',
          Authorization: `Bearer ${accessToken.accessToken}`,
          'Cache-Control': 'no-cache',
          Cookie:
            '_gcl_au=1.1.1403546763.1731925210; _hjSessionUser_2572333=eyJpZCI6IjQ0NTEyMjY1LTc1ZGMtNWRlZi04MzMwLTliNDhlZmRmMDZmZiIsImNyZWF0ZWQiOjE3MzE5MjUyMTIzOTcsImV4aXN0aW5nIjp0cnVlfQ==; _ga=GA1.1.1665779777.1731925210; _ga_Y8STE1XM07=GS1.1.1731925209.1.1.1731926457.57.0.0',
          DNT: '1',
          Language: 'null',
          Pragma: 'no-cache',
          Priority: 'u=1, i',
          Referer: 'https://bca-ltm.ltlabs.co/tickets',
          'Sec-Ch-Ua':
            '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'Sec-Ch-Ua-Mobile': '?1',
          'Sec-Ch-Ua-Platform': '"Android"',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
        },
      },
    );

    return [repair_tickets, maintenance_tickets];
  }

 sumInrepairByGrabbedBy(tickets) {
  const map = {};
  tickets.forEach(ticket => {
    // skip if no grabbedBy (sometimes might be null/undefined)
    if (!ticket.grabbedBy) return;
    // treat null/undefined inrepairDuration as 0
    const duration = typeof ticket.inrepairDuration === 'number' ? ticket.inrepairDuration : 0;
    if (!map[ticket.grabbedBy]) {
      map[ticket.grabbedBy] = 0;
    }
    map[ticket.grabbedBy] += duration;
  });

  // transform map to array of objects
  return Object.entries(map).map(([employeeId, totalRepairDuration]) => ({
    employeeId,
    totalRepairDuration
  }));
}

 sumInMaintenanceByGrabbedBy(tickets) {
  const map = {};
  tickets.forEach(ticket => {
    if (!ticket.grabbedBy) return;
    const duration = typeof ticket.closedDuration === 'number' ? ticket.closedDuration : 0;
    if (!map[ticket.grabbedBy]) {
      map[ticket.grabbedBy] = 0;
    }
    map[ticket.grabbedBy] += duration;
  });

  return Object.entries(map).map(([employeeId]) => ({
    employeeId
  }));
}

  async dailyReport() {

   const performanceReport = {
    employees: employee_name.map((employee) => {
      return {
        employee_name: employee.name,
        employee_id: employee.id,
        nptPercentage: Math.floor(Math.random() * 100),
        default_working_hours: 600,
        repair_tickets: 300,
        maintenance_tickets: 300,
      };
    }),
   }

   const [repair_tickets, maintenance_tickets] = await this.getTicketReport();
   const repairTickets = (await repair_tickets).data.tickets.result;
   const mainTenanceTickets = (await maintenance_tickets).data.tickets.result;
   const sumRepairTickets = this.sumInrepairByGrabbedBy(repairTickets);
   const sumMaintenanceTickets = this.sumInMaintenanceByGrabbedBy(mainTenanceTickets);
   console.log(sumMaintenanceTickets)
  //  const sumMaintenanceTickets = this.sumMaintenanceTickets((await maintenance_tickets).data);
    return sumRepairTickets;
  }

  async generateChart() {
    const QuickChart = require('quickchart-js');

    const myChart = new QuickChart();
    myChart.setConfig({
      type: 'line',
      data: {
        labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        datasets: [
          {
            label: 'Smoothed Data',
            data: (function exponentialSmoothing(data, alpha) {
              const smoothedData = [data[0]];

              for (let i = 1; i < data.length; i++) {
                const previousPoint = smoothedData[i - 1];
                const currentPoint = data[i];
                const smoothedPoint =
                  alpha * currentPoint + (1 - alpha) * previousPoint;
                smoothedData.push(smoothedPoint);
              }

              return smoothedData;
            })(
              // Your raw data goes here:
              [10, 12, 13, 15, 14, 13, 15, 17, 18, 17],
              // Smoothing parameter ALPHA:
              0.5,
            ),
          },
          {
            label: 'Acceptable Idle Percentage',
            data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
            fill: false,
          },
        ],
      },
    });
    await myChart.toFile('./images/mychart.png');
    return myChart.getUrl();
  }
}
