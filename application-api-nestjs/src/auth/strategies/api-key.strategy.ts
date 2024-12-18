import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as HeaderAPIKeyStrategy from 'passport-headerapikey';
import { ApplicationsService } from '../../applications/applications.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor(private readonly applicationsService: ApplicationsService) {
    super(
      { header: 'X-API-Key', prefix: '' },
      true,
      async (apiKey: string, done: any) => {
        try {
          const application =
            await this.applicationsService.findByApiKey(apiKey);
          if (!application) {
            return done(new UnauthorizedException(), false);
          }
          await this.applicationsService.incrementRequestCount(application.id);
          return done(null, true);
        } catch (err) {
          console.log(err);
          return done(new UnauthorizedException(), false);
        }
      },
    );
  }
}
