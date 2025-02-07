import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Cron } from '@nestjs/schedule';
import { formatDate } from './util/helper';

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
          reportedDt: `${formatDate(new Date())}~${formatDate(new Date())}`,
          ticketType: 'r',
          status: 17168,
          currentPage: 1,
          pageSize: 1000,
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
          reportedDt: `${formatDate(new Date())}~${formatDate(new Date())}`,
          ticketType: 'm',
          status: 17192,
          currentPage: 1,
          pageSize: 1000,
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

    let combine_tickets;

    const responses = await Promise.all([repair_tickets, maintenance_tickets])
      .then((responses) => {
        const [response1, response2] = responses; // Destructure the responses
        combine_tickets = [
          ...response1.data.tickets.result,
          ...response2.data.tickets.result,
        ];
        return combine_tickets;
      })
      .catch((error) => {
        console.log('Error in one or more requests:', error);
        throw error; // Rethrow the error to be handled by the caller
      });

    return responses;
  }

  async reports() {
    const tickets = await this.getTicketReport();
    const result = tickets.map((ticket) => {
      const {
        grabbedBy,
        reportedDt,
        status,
        ticketType,
        subject,
        inrepairDuration,
        closedDuration,
      } = ticket;
      return {
        grabbedBy,
        reportedDt,
        status,
        ticketType,
        subject,
        inrepairDuration: inrepairDuration,
        closedDuration,
      };
    });

    const summary = result.reduce((acc, ticket) => {
      if (!acc[ticket.grabbedBy]) {
        acc[ticket.grabbedBy] = { inrepairDuration: 0, closedDuration: 0 };
      }
      acc[ticket.grabbedBy].inrepairDuration += ticket.inrepairDuration || 0;
      acc[ticket.grabbedBy].closedDuration += ticket.closedDuration || 0;
      return acc;
    }, {});
    const summaryArray = [];
    for (const key in summary) {
      summary[key].employee_name = employee_name.find(
        (employee) => employee.id === key,
      ).name;
      summary[key].employee_id = key;
      summaryArray.push(summary[key]);
      const totalDuration =
        summary[key].inrepairDuration + summary[key].closedDuration;
      summary[key].idle_percent =
        (((600 - totalDuration) / 600) * 100).toFixed(0) + '%';
      summary[key].Date = formatDate(new Date());
    }

    return summaryArray;
  }
}
