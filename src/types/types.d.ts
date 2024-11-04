
import { Request } from 'express';
import { IPayload } from './IPayload';  // La interfaz que define el payload

declare module 'express' {
  export interface Request {
    userID?: IPayload;  // Aquí defines que req.user será de tipo IPayload
  }
}