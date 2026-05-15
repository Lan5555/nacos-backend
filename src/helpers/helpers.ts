/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export type Future = Promise<Net>;

type Net = {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
};

export const errorResponse = (message: any): Net => ({
  success: false,
  message: message instanceof Error ? message.message : String(message),
  data: null,
  error: message instanceof Error ? message.message : String(message),
});

export const successResponse = (message: string, data: any): Net => ({
  success: true,
  message: message,
  data: data,
});
