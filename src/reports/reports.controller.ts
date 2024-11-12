import { Body, Controller, Get, Patch, Post, UseGuards} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}
  
  @Get()
  getReports() {

  }
  
  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto) {
    return this.reportService.create(body);
  }
  
  @Patch('/:id')
  updateReport() {

  }
}
