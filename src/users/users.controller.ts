import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/role/role-decorators';
import { Role } from 'src/role/role-guard';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly authService: UsersService) {}

  @Post('/signup')
  @Roles(Role.PUBLIC)
  @ApiOperation({
    summary: 'User Sign-Up',
    description: 'Create a new user account',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User has been successfully created',
  })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email already in use' })
  signUp(@Body() signUpDto: SignUpDto) {
    console.log(signUpDto)
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  @Roles(Role.PUBLIC)
  @ApiOperation({
    summary: 'User Sign-In',
    description: 'Authenticate a user and return a token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully authenticated',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
