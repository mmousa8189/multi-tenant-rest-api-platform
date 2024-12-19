declare module 'passport-headerapikey' {
  import { Strategy } from 'passport';

  export interface HeaderAPIKeyStrategyOptions {
    header?: string;
    prefix?: string;
  }

  export class HeaderAPIKeyStrategy extends Strategy {
    constructor(
      options: HeaderAPIKeyStrategyOptions,
      verify: boolean,
      callback?: (apikey: string, done: (error: any, user?: any) => void) => void,
    );
  }
}
