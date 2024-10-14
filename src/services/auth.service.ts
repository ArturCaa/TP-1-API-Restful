import NodeRSA from 'node-rsa';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 
import { JWT_SECRET } from '../utils/jwt.util';
import { UserService } from './user.service';

export class AuthService {
  public static async login(username: string, password: string): Promise<string | null> {
    const user = await UserService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      return token;
    }
    return null;
  }
}

const key = new NodeRSA({ b: 512 });
const publicKey = key.exportKey('public');
const privateKey = key.exportKey('private');

export { key };