import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of the application' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Domain of the application' })
  domain: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Description of the application' })
  description?: string;
}
