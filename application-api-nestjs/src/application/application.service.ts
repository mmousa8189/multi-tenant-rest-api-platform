import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Application } from './schemas/application.schema';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name) private applicationModel: Model<Application>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto, userId: string): Promise<Application> {
    const apiKey = uuidv4();
    const createdApplication = new this.applicationModel({
      ...createApplicationDto,
      apiKey,
      ownerId: userId,
    });
    return createdApplication.save();
  }

  async findAll(userId: string): Promise<Application[]> {
    return this.applicationModel.find({ ownerId: userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Application> {
    const application = await this.applicationModel.findById(id).exec();
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    if (application.ownerId !== userId) {
      throw new UnauthorizedException();
    }
    return application;
  }

  async update(id: string, updateApplicationDto: CreateApplicationDto, userId: string): Promise<Application> {
    const application = await this.findOne(id, userId);
    Object.assign(application, updateApplicationDto);
    return application.save();
  }

  async remove(id: string, userId: string): Promise<void> {
    const application = await this.findOne(id, userId);
    await application.deleteOne();
  }

  async findByApiKey(apiKey: string): Promise<Application> {
    const application = await this.applicationModel.findOne({ apiKey }).exec();
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return application;
  }
}
