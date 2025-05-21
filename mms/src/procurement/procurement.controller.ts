import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProcurementService } from './procurement.service';
import { CreateProcurementDto } from './dtos/create-procurement.dto';
import { UpdateProcurementStatusDto } from './dtos/update-procurement-status.dto';
import { Procurement } from './procurement.entity';

@ApiTags('procurement')
@Controller('procurement')
export class ProcurementController {
  constructor(private readonly procurementService: ProcurementService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new procurement request' })
  create(@Body() createProcurementDto: CreateProcurementDto): Promise<Procurement> {
    return this.procurementService.create(createProcurementDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all procurement requests' })
  findAll(): Promise<Procurement[]> {
    return this.procurementService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a procurement request by id' })
  findOne(@Param('id') id: string): Promise<Procurement> {
    return this.procurementService.findOne(+id);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update procurement status' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateProcurementStatusDto
  ): Promise<Procurement> {
    return this.procurementService.updateStatus(+id, updateStatusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a procurement request' })
  remove(@Param('id') id: string): Promise<number> {
    return this.procurementService.remove(+id);
  }
} 