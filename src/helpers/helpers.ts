/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PipeTransform, Injectable } from '@nestjs/common';
export type Future = Promise<Net>;

type Net = {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
};

export const errorResponse = (error: any): Net => {
  let message = 'An error occurred';
  let errorData: any = null;

  if (error instanceof Error) {
    message = error.message;
    errorData = {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  } else if (typeof error === 'string') {
    message = error;
    errorData = error;
  } else if (typeof error === 'object' && error !== null) {
    message = error.message || error.error || 'An error occurred';
    errorData = error;
  }

  return {
    success: false,
    message,
    data: null,
    error: errorData,
  };
};

export const successResponse = (message: string, data: any): Net => ({
  success: true,
  message: message,
  data: data,
});

@Injectable()
export class ParseJsonPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  }
}
