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
import { AppService } from './app.service';
import { ReportType } from './data';

const doesTypeExists = (type: ReportType): boolean => {
  return Object.values(ReportType).includes(type) ? true : false;
};

const notFound = new HttpException('Not Found', HttpStatus.NOT_FOUND);

@Controller('/report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: ReportType) {
    if (doesTypeExists(type)) {
      return this.appService.getAllReports(type);
    }

    return notFound;
  }

  @Get(':id')
  getReportById(@Param('type') type: ReportType, @Param('id') id: string) {
    if (doesTypeExists(type)) {
      return this.appService.getReportById(id);
    }

    throw notFound;
  }

  @Post()
  createReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: ReportType,
  ) {
    if (doesTypeExists(type)) {
      return this.appService.createReport(source, amount, type);
    }

    throw notFound;
  }

  @Put(':id')
  UpdateReportById(
    @Param('type') type: ReportType,
    @Param('id') id: string,
    @Body() { amount, source }: { amount: number; source: string },
  ) {
    if (doesTypeExists(type)) {
      return this.appService.updateReportById(id, amount, source);
    }

    throw notFound;
  }

  @Delete(':id')
  DeleteReportById(@Param('type') type: ReportType, @Param('id') id: string) {
    if (doesTypeExists(type)) {
      return this.appService.deleteReportById(id);
    }

    throw notFound;
  }
}
