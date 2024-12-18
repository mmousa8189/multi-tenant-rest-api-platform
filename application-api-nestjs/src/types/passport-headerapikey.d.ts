declare module 'passport-headerapikey' {
  import { Strategy as PassportStrategy } from 'passport-strategy';

  interface StrategyOptions {
    header: string;
    prefix?: string;
  }

  class HeaderAPIKeyStrategy extends PassportStrategy {
    constructor(
      options: StrategyOptions, 
      verify: (apiKey: string, done: (error: any, user?: any, info?: any) => void) => void
    );
  }

  export = HeaderAPIKeyStrategy;
}
