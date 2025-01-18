import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { userRole } from '@prisma/client';
import { CreateAuthInput } from './dto/createAuthInput';
import { LoginInput } from './dto/loginInput';
import { HttpException, HttpStatus } from '@nestjs/common';
import { v4 as UUID } from 'uuid';
import { EmailService } from '../../utils/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async registerVendor(UserInput: CreateAuthInput): Promise<any> {
    try {
      const hashPassword = await bcrypt.hash(UserInput.password, 10);
      const firstUser = await this.prisma.user.count();
      const role = firstUser === 0 ? userRole.ADMIN : userRole.VENDOR;

      const user = await this.prisma.user.create({
        data: {
          id: UUID(),
          email: UserInput.email,
          password: hashPassword,
          role,
          vendorName: UserInput.vendorName,
          phoneNumber: UserInput.phoneNumber,
          vendorId: `ID-${UUID().slice(0, 6)}`,
        },
      });

      return {
        status: HttpStatus.CREATED,
        message: 'User created successfully',
        success: true,
      };
    } catch (error) {
      console.log('Error while Registering Vendor', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async loginVendor(UserInput: LoginInput, context) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: UserInput.email,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(
        UserInput.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
      );

      context.res.cookie('access_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      return {
        status: HttpStatus.OK,
        message: 'User logged in successfully',
        success: true,
        data: {
          id: user.id,
          email: user.email,
          role: user.role,
          vendorName: user.vendorName,
          phoneNumber: user.phoneNumber,
          vendorId: user.vendorId,
        },
      };
    } catch (error) {
      console.log('Error while Login Vendor', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async logoutVendor(context) {
    try {
      const res = context.res;
      res.clearCookie('access_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      return {
        status: HttpStatus.OK,
        message: 'User logged out successfully',
        success: true,
      };
    } catch (error) {
      console.log('Error while Logout Vendor', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //forgot pass
  async forgotPassword(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new HttpException(
          'User not found',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '15m',
      });
      if (!token) {
        throw new HttpException(
          'Error while generating token',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const emailSubject = 'Forgot Password';
      const emailBody = `<h1>Forgot Password</h1><p>Click on the link below to reset your password:</p><a href='${process.env.CLIENT_URL}/reset-password?token=${token}'>Reset Password</a>`;

      await this.emailService.sendEmail(email, emailSubject, emailBody);
    } catch {
      throw new HttpException(
        'Error while sending email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetPassword(context, password: string) {
    try {
      const token = context.req.query.token;
      const email = jwt.verify(token, process.env.JWT_SECRET);
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new HttpException(
          'User not found',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const hashPassword = await bcrypt.hash(password, 10);
      await this.prisma.user.update({
        where: {
          email: email,
        },
        data: {
          password: hashPassword,
        },
      });
      return {
        status: HttpStatus.OK,
        message: 'Password reset successfully',
        success: true,
      };
    } catch {
      throw new HttpException(
        'Error while resetting password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //changePassword
  //verifyEmail
}
