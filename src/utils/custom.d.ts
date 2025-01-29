declare namespace Express {
    export interface Request {
      user?: any;
      file?: any;
      token?: string;
    }
  }
  
  interface Error {
    statusCode?: number;
    data?: any;
  }
  