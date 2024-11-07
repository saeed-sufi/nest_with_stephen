import { Injectable, NestInterceptor , ExecutionContext, CallHandler} from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";

@Injectable()
export class currentUserInterceptor implements NestInterceptor {
  
  constructor(private userService: UsersService){}
  
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session
    
    if (userId) {
      const user = this.userService.findOne(userId)
      request.curretUser = user; 
    }
    
    return next.handle();
  }

}