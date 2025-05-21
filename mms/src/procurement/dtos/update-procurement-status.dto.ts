import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProcurementStatusDto {
  @ApiProperty({ enum: ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'] })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  remarks?: string;
} 