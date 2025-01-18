import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  async sendEmail(to: string, subject: string, message: string) {
    await this.mailService.sendMail({
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      html: message,
    });
  }
}
