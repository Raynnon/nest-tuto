import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';

const notFound = new HttpException('Not Found', HttpStatus.NOT_FOUND);
const filteredType = (type: string) => {
  if (type === ReportType.INCOME || type === ReportType.EXPENSE) {
    return data.report.filter((report) => {
      return report.type === type;
    });
  }

  throw notFound;
};

@Controller('/report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    return filteredType(type);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const filteredReport = filteredType(type).find(
      (report) => report.id === id,
    );

    if (filteredReport) {
      return filteredReport;
    }

    throw notFound;
  }

  @Post()
  createReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: string,
  ) {
    if (type === ReportType.INCOME || type === ReportType.EXPENSE) {
      const newReport = {
        id: uuid(),
        source,
        amount,
        created_at: new Date(),
        updated_at: new Date(),
        type,
      };

      data.report.push(newReport);

      return newReport;
    }

    throw notFound;
  }

  @Put(':id')
  UpdateReportById(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() { amount, source }: { amount: number; source: string },
  ) {
    if (type === ReportType.INCOME || type === ReportType.EXPENSE) {
      const updatedReport = data.report.map((item, index) => {
        if (item.id === id) {
          const newReport = {
            ...item,
            source: source ? source : item.source,
            amount: amount ? amount : item.amount,
            updated_at: new Date(),
          };

          return newReport;
        }

        return item;
      });

      data.report = updatedReport;
      return data.report;
    }

    throw notFound;
  }

  @Delete(':id')
  DeleteReportById(@Param('type') type: string, @Param('id') id: string) {
    if (type === ReportType.INCOME || type === ReportType.EXPENSE) {
      const updatedReport = data.report.filter((item) => {
        return item.id !== id;
      });

      data.report = updatedReport;
      return data.report;
    }

    throw notFound;
  }
}
