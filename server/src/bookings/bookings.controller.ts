import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.bookingsService.findAll(req.user.sub || req.user.userId, req.user.role);
  }

  @Post()
  create(@Request() req, @Body() data: any) {
    return this.bookingsService.create(req.user.sub || req.user.userId, data);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string, @Body('reason') reason?: string) {
    return this.bookingsService.updateStatus(id, status, reason);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookingsService.delete(id);
  }
}
