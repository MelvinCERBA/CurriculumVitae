import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create({ first_name, last_name, email, password }: CreateUserDto) {
    // stores the salt in the generated hash (eg. $2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36UNaZCAp6kz47J/F.3A5gG )
    const passwordHash = await hash(password, 10);
    return this.userRepository.save({
      first_name: first_name,
      last_name: last_name,
      email: email,
      passwordHash: passwordHash,
    });
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findOneById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

}
