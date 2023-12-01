import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const user = await this.findOneByEmail(email);

    if (user) {
      throw new HttpException('Email is taken', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  public async findOneByEmail(email: string, select?: string): Promise<User> {
    return this.userModel.findOne({ email }).select(select).exec();
  }

  public async findOneById(userId: string, select?: string): Promise<User> {
    return this.userModel.findById(userId).select(select).exec();
  }

  public async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, updateUserDto, {
      new: true,
    });
  }
}
