import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service"
import { User } from "./user.entity"

let service: AuthService
let fakeUsersService: Partial<UsersService>

describe('AuthService', () => {

  beforeEach(async () => {
    fakeUsersService  = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User)
    }
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService
        }
      ]
    }).compile()

    service = module.get(AuthService)
  })

  it('can create an instace of auth service', async () => {
    expect(service).toBeDefined
  })
  
  it('create a new user with a salted and hashed password', async () => {
    const user = service.signup('sfi.geo@gmail.com', '1231qaz')
    
    expect((await user).password).not.toEqual('1231qaz')
    const [salt, hash] = (await user).password.split('.')
    
    expect(salt).toBeDefined
    expect(hash).toBeDefined
  })
  
  it('throws an error if a user signs up with an email that is already in use', async () => {
    fakeUsersService.find = () => Promise.resolve([{id: 1, email: 'test@test.com', password: 'test'} as User])   

    await service.signup('t@test.com', 'test')
  })
})