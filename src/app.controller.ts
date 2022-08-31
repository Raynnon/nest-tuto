import {Controller, Get, Post, Put, Delete} from "@nestjs/common";

@Controller("/report/:type")
export class AppController {
  @Get()
  getAllReports() {
    return "Hello World!"
  }

  @Get(":id")
  getReportById() {
    return {}
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