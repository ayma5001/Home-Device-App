import { User } from '../models/User.model';
import { Subject } from 'rxjs/Subject';

export class UserService {
  private users: User[] = [
    {
      firstName: 'Mahmoud',
      lastName:'Ayed',
      email:'mahmoudayed@hotmail.fr',
      drinkPreference: 'coca',
      hobbies: ['coding', 'drink coffee']
    }
];
  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }
}
