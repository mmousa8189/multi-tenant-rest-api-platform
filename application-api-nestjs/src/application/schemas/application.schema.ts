import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Application extends Document {
  @ApiProperty({ description: 'Name of the application' })
  @Prop({ required: true })
  name!: string;

  @ApiProperty({ description: 'Domain of the application' })
  @Prop({ required: true })
  domain!: string;

  @ApiProperty({ description: 'Description of the application' })
  @Prop()
  description?: string;

  @ApiProperty({ description: 'Auto-generated API key' })
  @Prop({ unique: true })
  apiKey!: string;

  @ApiProperty({ description: 'Status of the application' })
  @Prop({ default: 'active' })
  status!: string;

  @ApiProperty({ description: 'Owner ID of the application' })
  @Prop({ required: true })
  ownerId!: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
