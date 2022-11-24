import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { Contact } from './contact.schema';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private service: ContactsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createContact(@Body() body: Contact) {
    this.service.addOneContact(body);
  }

  @Get()
  @UsePipes()
  getAllContact(
    @Query('_limit', new DefaultValuePipe(10), ParseIntPipe) _limit: number,
    @Query('_page', new DefaultValuePipe(1), ParseIntPipe) _page: number,
    @Body() body?: Contact,
  ) {
    return this.service.getAllContacts(_limit, _page, body.email);
  }

  @Get('/:id')
  async getContactById(@Param('id') id: string) {
    const chosenContact = await this.service.getContactById(id);
    if (!chosenContact) throw new NotFoundException();
    return chosenContact;
  }
}