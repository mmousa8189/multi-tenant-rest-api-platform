import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ description: 'Name of the application' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Domain of the application' })
  @IsString()
  @IsNotEmpty()
  readonly domain: string;

  @ApiPropertyOptional({ description: 'Description of the application' })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
