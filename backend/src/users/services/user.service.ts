import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

export interface SearchUserParams {
  limit: number;
  offset: number;
  email?: string;
  name?: string;
  contactPhone?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(data: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const createdUser = new this.userModel({
      ...data,
      passwordHash: hashedPassword,
    });
    return createdUser.save();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll(params: SearchUserParams): Promise<User[]> {
    const query: any = {};
    if (params.email) {
      query.email = { $regex: params.email, $options: 'i' };
    }
    if (params.name) {
      query.name = { $regex: params.name, $options: 'i' };
    }
    if (params.contactPhone) {
      query.contactPhone = { $regex: params.contactPhone, $options: 'i' };
    }

    return this.userModel.find(query).limit(params.limit).skip(params.offset).exec();
  }
}