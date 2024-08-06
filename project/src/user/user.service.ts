import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create({ firstName, lastName, email, password }: CreateUserDto) {
    // stores the salt in the generated hash (eg. $2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36UNaZCAp6kz47J/F.3A5gG )
    const passwordHash = await hash(password, 10);
    return this.userRepository.save({
      firstName: firstName,
      lastName: lastName,
      email: email,
      passwordHash: passwordHash,
    });
  }

  async findOneByEmail(email: string, options = {}) {
    return this.userRepository.findOne({
      where: { email },
      ...options,
    });
  }

  async findOneById(id: number, options = {}) {
    return this.userRepository.findOne({
      where: { id },
      ...options,
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.userRepository.save({ ...user, ...dto });
  }

}
