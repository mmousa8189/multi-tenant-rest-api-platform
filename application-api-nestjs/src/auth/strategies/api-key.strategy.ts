import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { ApplicationService } from '../../application/application.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
  constructor(private readonly applicationService: ApplicationService) {
    super(
      { header: 'X-API-Key', prefix: '' },
      false, // Set to false to handle validation ourselves
      async (apiKey: string, done: any) => {
        if (!apiKey) {
          return done(new UnauthorizedException('API key is missing'), null);
        }

        try {
          const application = await this.applicationService.findByApiKey(apiKey);
          if (!application) {
            return done(new UnauthorizedException('Invalid API key'), null);
          }
          return done(null, application);
        } catch (err) {
          console.error('API Key validation error:', err);
          return done(new UnauthorizedException('Invalid API key'), null);
        }
      },
    );
  }
}
