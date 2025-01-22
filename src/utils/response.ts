  export class ResponsePacket<T = null> {
    readonly code: number;
    readonly status: boolean;
    readonly message: string;
    readonly data: T;
    readonly timestamp: string;

    private constructor(
      code: number,
      status: boolean,
      message: string,
      data: T,
      timestamp: string = new Date().toISOString()
    ) {
      this.code = code;
      this.status = status;
      this.message = message;
      this.data = data;
      this.timestamp = timestamp;
    }

    static success<T>(statusCode: number, message: string, data: T) {
      return new ResponsePacket(statusCode, true, message, data);
    }

    static failure<T>(statusCode: number, message: string, data: T) {
      return new ResponsePacket(statusCode, false, message, data);
    }
  }