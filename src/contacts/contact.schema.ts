import { IsNotEmpty, Length, IsEmail, IsPhoneNumber } from 'class-validator';
import { Prop, Schema } from '@nestjs/mongoose';
import {} from 'mongoose';

@Schema()
export class Contact {
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
