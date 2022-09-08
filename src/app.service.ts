import { Injectable } from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';

interface ReportData {
  source: string;
  amount: number;
}

interface UpdateReport {
  source?: string;
  amount?: number;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => {
      return report.type === type;
    });
  }

  getReportById(id: string) {
    return data.report.find((report) => {
      return report.id === id;
    });
  }

  createReport({ amount, source }: ReportData, type: ReportType) {
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

  updateReportById(id: string, { amount, source }: UpdateReport) {
    const updatedReport = data.report.map((item) => {
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

  deleteReportById(id: string) {
    const updatedReport = data.report.filter((item) => {
      return item.id !== id;
    });

    data.report = updatedReport;
    return data.report;
  }
}
