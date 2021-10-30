export interface User {
  id: string;
  displayName: string;
}

export class UserDTO implements User {
  constructor(public id: string, public displayName: string) {}
}
