//user.decorator.ts
import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpError } from '../errors/custom.errors';
import * as jwt from 'jsonwebtoken';
import { Configs } from 'src/config/config';
import * as crypto from 'crypto';

export const CurrentUser = createParamDecorator(async (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtService = new JwtService();
    const auth_token =
        request.headers['Authorization'] ||
        request.headers['authorization'] ;

    if (!auth_token) {
        // throw HttpError(HttpStatus.UNAUTHORIZED, 'Unauthorized user!');
        return null
    }
    const token = auth_token.replace('Bearer ', "");
    if (!token)
        throw HttpError(HttpStatus.UNAUTHORIZED, 'Invalid Token!'); 
    try {
        const decoded = await jwtService.decode(token);
       
        return decoded;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new HttpException({ error: 'Token has expired', }, HttpStatus.UNAUTHORIZED);
        }
        throw new HttpException({ error: 'Invalid token', }, HttpStatus.UNAUTHORIZED);
    }
});

