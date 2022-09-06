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
  UpdateReportById() {
    return 'Updated';
  }

  @Delete(':id')
  DeleteReportById() {
    return 'Deleted';
  }
}
