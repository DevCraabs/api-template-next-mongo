import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = new this.userModel(dto);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException(`Utilisateur ${id} introuvable.`);
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const updated = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .select('-password');
    if (!updated) throw new NotFoundException(`Utilisateur ${id} introuvable.`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.userModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException(`Utilisateur ${id} introuvable.`);
  }
}
