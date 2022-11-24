import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './contact.schema';

@Injectable()
export class ContactsService {
  constructor(@InjectModel('Contact') private ContactModel: Model<Contact>) {}
  addOneContact(contact: Contact) {
    try {
      const c = new this.ContactModel({ ...contact });
      c.save();
      return c;
    } catch (err) {
      const error = {
        code: 403,
        desc: {
          short: 'Forbidden',
          long: 'Authorization header is missing in the request',
        },
      };
      throw new HttpException(error, 403);
    }
  }
  getAllContacts(_limit: number, _page: number, email?: string) {
    if (email) return this.ContactModel.findOne({ email: email });
    return this.ContactModel.find()
      .limit(_limit)
      .skip((_page - 1) * _limit);
  }
  getContactById(id: string) {
    const c = this.ContactModel.findById(id);
    console.log(c)
    return c;
  }
}
