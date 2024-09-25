import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs";
import { plainToClass } from "class-transformer";


export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run sth before a request is handled by the req handler
    console.log("I'm running before handlers: " + context)
    
    return handler.handle().pipe(
      map((data: any) => {
        console.log('I\'m running before response is sent out ', data)
      })
    )
  }
}