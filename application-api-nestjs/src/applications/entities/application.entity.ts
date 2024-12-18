import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Auto-generated UUID' })
  id: string;

  @Column()
  @ApiProperty({ description: 'Name of the application' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Domain of the application' })
  domain: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Description of the application' })
  description?: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'Auto-generated API key' })
  apiKey: string;

  @Column({ default: 'active' })
  @ApiProperty({
    description: 'Status of the application',
    enum: ['active', 'inactive'],
  })
  status: 'active' | 'inactive';

  @Column({ default: 0 })
  @ApiProperty({ description: 'Number of API requests made' })
  requestCount: number;

  @CreateDateColumn()
  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}
