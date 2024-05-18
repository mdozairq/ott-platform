// services/auth.service.ts
import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDocument } from './entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { HttpError } from 'src/errors/custom.errors';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<userDocument>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { username, email, password } = signUpDto;

    const existingUser = await this.userModel.findOne({ email }).lean();
    if (existingUser) {
      throw HttpError(HttpStatus.CONFLICT, 'Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return this.generateToken(newUser);
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userModel.findOne({ email }).lean();
    if (!user) {
      throw HttpError(HttpStatus.NOT_FOUND, 'Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw HttpError(HttpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    return this.generateToken(user);
  }

  private generateToken(user: userDocument) {
    const payload = { userId: user._id, email: user.email };
    const token = jwt.sign(payload, 'SECRET_KEY', { expiresIn: '1h' });
    return { token };
  }
}
