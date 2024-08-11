import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { IncomingHttpHeaders } from 'http';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.guard';
import { GqlExecutionContext } from '@nestjs/graphql/dist';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;


    const request = this.getRequest(context)
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>("JWT_SECRET"),
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private getRequest(context: ExecutionContext): Request {
    const contextType = context.getType() as 'http' | 'ws' | 'rpc' | 'graphql'

    switch (contextType) {
      case 'http':
        return context.switchToHttp().getRequest();
      case 'graphql':
        return GqlExecutionContext.create(context).getContext().req;
      default:
        throw new Error(`Invalid context type ${context.getType()}`);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
