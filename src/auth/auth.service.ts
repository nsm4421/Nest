import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private saltOrRounds: number = 10;

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...payload } = user;
      return payload;
    }
    return null;
  }

  async getAccessToken(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      // TODO : secret환경변수로 주입, expiration 추가
      access_token: this.jwtService.sign(payload, { secret: '1221' }),
    };
  }

  async signUp(username: string, password: string) {
    // validate whether username is not duplicate
    const fetched = await this.userRepository.findOneBy({ username });
    if (fetched) {
      throw new BadRequestException(`username ${username} is already exists`);
    }
    // saved hashed password
    const hashedPassword = await bcrypt.hash(password, this.saltOrRounds);
    this.userRepository.save({
      username,
      password: hashedPassword,
    });
  }
}
