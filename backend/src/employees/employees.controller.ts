import { Controller, Get, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { DataService } from './data.service';
import type { 
  NetworkGraph, 
  EmployeeDetail, 
  AnalyticsResponse,
  InsightsResponse,
  PerformanceResponse,
  EmployeeListResponse,
} from './domain/entities/employee.interface';

@Controller('api')
export class EmployeesController {
  constructor(private readonly dataService: DataService) {}

  // Dashboard - Network Graph
  @Get('dashboard')
  getDashboard(): NetworkGraph {
    return this.dataService.getNetworkGraph();
  }

  // Employee Detail
  @Get('employee/:id')
  getEmployee(@Param('id') id: string): EmployeeDetail {
    const employeeDetail = this.dataService.getEmployeeDetail(id);
    
    if (!employeeDetail) {
      throw new HttpException(
        `Employee with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return employeeDetail;
  }

  // Employee List with filtering
  @Get('employees')
  getEmployees(
    @Query('search') search?: string,
    @Query('department') department?: string,
    @Query('burnoutRisk') burnoutRisk?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ): EmployeeListResponse {
    return this.dataService.getEmployeeList(search, department, burnoutRisk, sortBy, sortOrder);
  }

  // Analytics
  @Get('analytics')
  getAnalytics(): AnalyticsResponse {
    return this.dataService.getAnalytics();
  }

  // Insights
  @Get('insights')
  getInsights(): InsightsResponse {
    return this.dataService.getInsights();
  }

  // Performance
  @Get('performance')
  getPerformance(): PerformanceResponse {
    return this.dataService.getPerformance();
  }
}

