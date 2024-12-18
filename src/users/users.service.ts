import { Injectable, Controller, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  
  create(email: string, password: string) {
    const user = this.repo.create({email, password})

    return this.repo.save(user);
  }
  
  findOne(id: number) {
    // null or id
    if (!id) {
      return null
    }
    return this.repo.findOne({ where: { id } });
  }
    
  find(email: string) {
    // empty array or array of users
    return this.repo.find({ where: {email} })
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id)
    if (!user) {
      throw new NotFoundException('user not found')
    }

    Object.assign(user, attrs)
    return this.repo.save(user)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    
    if (!user) {
      throw new NotFoundException('user not found')
    }

    return this.repo.remove(user)
  }
}
