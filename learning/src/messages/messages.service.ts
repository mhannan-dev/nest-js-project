import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  private messages: Record<
    number,
    { id: number; content: string; author: string }
  > = {};
  private idCounter = 1;

  create(createMessageDto: CreateMessageDto) {
    const id = this.idCounter++;
    this.messages[id] = { id, ...createMessageDto };
    return this.messages[id];
  }

  findAll() {
    return Object.values(this.messages);
  }

  findOne(id: number) {
    const message = this.messages[id];
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return message;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    const existingMessage = this.findOne(id);
    this.messages[id] = { ...existingMessage, ...updateMessageDto };
    return this.messages[id];
  }

  remove(id: number) {
    const existingMessage = this.findOne(id);
    delete this.messages[id];
    return existingMessage;
  }
}
