import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { ApplicationService } from '../../application/application.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
  constructor(private readonly applicationService: ApplicationService) {
    super(
      { header: 'X-API-Key', prefix: '' },
      true,
      async (apiKey: string, done: any) => {
        try {
          const application = await this.applicationService.findByApiKey(apiKey);
          if (!application) {
            return done(new UnauthorizedException(), false);
          }
          return done(null, application);
        } catch (err) {
          console.log(err);
          return done(new UnauthorizedException(), false);
        }
      },
    );
  }
}
