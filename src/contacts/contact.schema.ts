import { IsNotEmpty, Length, IsEmail, IsPhoneNumber } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Contact extends Document {
  @Prop()
  @IsNotEmpty()
  @Length(3, 25)
  name: string;

  @Prop()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);