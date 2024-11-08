import { Body, Controller, Injectable, Get, Param, Patch, Post, Query, Delete, NotFoundException, UseInterceptors, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { currentUser } from './decorators/current-user.decorator';
// import { currentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
// @UseInterceptors(currentUserInterceptor)
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) { }
  
 /*  @Get('/whoami')
  async whoami(@Session() session: any) {
    if (!session.userId) {
      throw new NotFoundException('not signed in user')
    }
    return await this.usersService.findOne(session.userId)
  }
   */
  @Get('/whoami')
  @UseGuards(AuthGuard)
  who(@currentUser() user: User) {
    return user;
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password)
    session.userId = user.id
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password)
    session.userId = user.id
    return user
  }
  
  @Get('/:id')
  async findUser(@Param ('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id)) 

    if (!user) {
      throw new NotFoundException('user not found')
    }
    return user;
  }
  
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email)
  }
  
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id))
  }
  
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body)
  }
}
