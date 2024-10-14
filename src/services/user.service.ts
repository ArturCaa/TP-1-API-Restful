import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';
import { key } from './auth.service';
import bcrypt from 'bcryptjs';

export class UserService {
  public static async findByUsername(email: string) {
    return this.getAllUsers().then(users=> users.filter(user => user.email === email)[0]);
  }

  public static async getAllUsers(): Promise<User[]> {
    const password = bcrypt.hashSync('123', 10);
    return [new UserModel(1, 'John Doe', 'john.doe@example.com', 'johndoe', password, "manager"),
      new UserModel(1, 'Artur', 'artur@example.com', 'artur', password, "employee")
    ];
  }
}