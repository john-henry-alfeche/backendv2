import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { User } from '../data/User';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.dataSource.query(
      'SELECT user_id, username, password, name FROM LIB_USERS WHERE username = @0',
      [username],
    );

    if (user.length === 0) {
      return null;
    } else {
      const decryptPassword = await this.decrypt(user[0].password);
      if (decryptPassword === password) {
        return user;
      }
    }
  }

  async login(user: User) {
    const payload = {
      user_id: user.user_id,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async decrypt(stEncryptedText: string): Promise<string> {
    let stText = '';
    let bytCounter = 1;
    let iTemp = 0;
    const bytNumber = 8;

    while (bytCounter !== stEncryptedText.length + 1) {
      iTemp = stEncryptedText.charCodeAt(bytCounter - 1) ^ (10 - bytNumber);
      if (bytCounter % 2 === 0) {
        iTemp += bytNumber;
      } else {
        iTemp -= bytNumber;
      }
      stText += String.fromCharCode(iTemp);
      bytCounter++;
    }
    return stText;
  }
}

//SELECT user_id, empnumber, username, password, name FROM LIB_USERS (select all users)

// select * from view where approved_id
// SELECT * FROM view where rl_no

//`SELECT * FROM TABLE WHERE ID=? AND BLA=? AND BLA=?`,
//['tae', 'shit', 'crap'],

//`SELECT * from VIEW
