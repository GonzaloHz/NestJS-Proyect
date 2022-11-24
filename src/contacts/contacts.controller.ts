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
  Put,
  HttpCode,
  HttpStatus,
  BadRequestException,
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

  @Put('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateContact(@Param('id') id: string, @Body() body: Contact) {
    try {
      await this.service.updateContact(id, body);
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
