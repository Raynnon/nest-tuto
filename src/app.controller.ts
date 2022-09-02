import {Controller, Get, Post, Put, Delete, Param, HttpException, HttpStatus} from "@nestjs/common";
import { data, ReportType } from './data';

const notFound = new HttpException('Not Found', HttpStatus.NOT_FOUND);
const filteredType = (type:string) => {
  if (type === ReportType.INCOME || type === ReportType.EXPENSE) {
    return data.report.filter((report) => {
        return report.type === type
    })
  } else {
    throw notFound
  }
}

@Controller("/report/:type")
export class AppController {
  @Get()
  getAllReports(
    @Param("type") type:string
  ) {
    return filteredType(type);
  }

  @Get(":id")
  getReportById(
    @Param("type") type:string,
    @Param("id") id:string
  ) {
    const filteredReport = filteredType(type).find(report => report.id === id)
    
    if (filteredReport) {
    return filteredReport;
    } else {
    throw notFound;
    }
  }

  @Post()
  createReport() {
    return "created"
  }

  @Put(":id")
  UpdateReportById() {
    return "Updated"
  }

  @Delete(":id")
  DeleteReportById() {
    return "Deleted"
  }
}