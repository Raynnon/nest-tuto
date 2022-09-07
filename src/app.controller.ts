import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ReportType } from './data';
import { CreateReportDto } from './dtos/report.dto';

const doesTypeExists = (type: ReportType): boolean => {
  return Object.values(ReportType).includes(type) ? true : false;
};

@Controller('/report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ) {
    if (doesTypeExists(type)) {
      return this.appService.getAllReports(type);
    }
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    if (doesTypeExists(type)) {
      return this.appService.getReportById(id);
    }
  }

  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ) {
    if (doesTypeExists(type)) {
      return this.appService.createReport({ source, amount }, type);
    }
  }

  @Put(':id')
  updateReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { amount, source }: { amount: number; source: string },
  ) {
    if (doesTypeExists(type)) {
      return this.appService.updateReportById(id, { amount, source });
    }
  }

  @Delete(':id')
  deleteReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    if (doesTypeExists(type)) {
      return this.appService.deleteReportById(id);
    }
  }
}
