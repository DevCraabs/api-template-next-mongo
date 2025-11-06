import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

  @ApiProperty({ example: 'john.doe@example.com' })
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'hashedpassword123', writeOnly: true })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'user', enum: ['user', 'admin'], default: 'user' })
  @Prop({ default: 'user' })
  role: string;

  @ApiProperty({ example: false })
  @Prop({ default: false })
  isGoogleAccount: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
