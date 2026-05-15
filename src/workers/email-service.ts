/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_LOGIN,
      pass: process.env.BREVO_PASS,
    },
  });

  async sendMail(
    to: string,
    subject: string,
    type: 'info' | 'otp',
    message?: string,
    otp?: string,
  ) {
    let html: string;

    if (type === 'info') {
      html = this.infoTemplate(subject, message ?? '');
    } else {
      html = this.otpTemplate(otp ?? '');
    }

    return await this.transporter.sendMail({
      from: `"Nacos" <${process.env.BREVO_SENDER}>`,
      to,
      subject,
      html,
    });
  }

  private infoTemplate(title: string, message: string): string {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
      </head>

      <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding:40px 0;">

              <table width="600" cellpadding="0" cellspacing="0"
                style="background:#ffffff;border-radius:12px;padding:40px;">

                <tr>
                  <td align="center">
                    <h1 style="margin:0;color:#111827;font-size:28px;">
                      ${title}
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding-top:30px;">
                    <p style="font-size:16px;color:#374151;line-height:1.8;">
                      ${message}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding-top:40px;border-top:1px solid #e5e7eb;">
                    <p style="font-size:12px;color:#9ca3af;text-align:center;">
                      © 2026 Nacos. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
  }

  private otpTemplate(otp: string): string {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>OTP Verification</title>
      </head>

      <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding:40px 0;">

              <table width="600" cellpadding="0" cellspacing="0"
                style="background:#ffffff;border-radius:12px;padding:40px;">

                <tr>
                  <td align="center">
                    <h1 style="margin:0;color:#111827;font-size:28px;">
                      Nacos Verification
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding-top:30px;">
                    <p style="font-size:16px;color:#374151;line-height:1.6;">
                      Use the OTP below to complete your verification process.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding:30px 0;">
                    <div
                      style="
                        display:inline-block;
                        background:#111827;
                        color:#ffffff;
                        font-size:36px;
                        font-weight:bold;
                        letter-spacing:8px;
                        padding:20px 40px;
                        border-radius:10px;
                      "
                    >
                      ${otp}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <p style="font-size:14px;color:#6b7280;line-height:1.6;">
                      This OTP expires in 10 minutes.
                    </p>

                    <p style="font-size:14px;color:#6b7280;line-height:1.6;">
                      If you did not request this code, ignore this email.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding-top:30px;border-top:1px solid #e5e7eb;">
                    <p style="font-size:12px;color:#9ca3af;text-align:center;">
                      © 2026 Nacos. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
  }
}
