export default class LoginModel {
  public id: number;
  public user: string;
  public completeName: string;
  public password: string;
  public email: string;

  constructor({ user, completeName, password, email }: Omit<LoginModel, "id">) {
    this.id = 0;
    this.user = user;
    this.completeName = completeName;
    this.password = password;
    this.email = email;
  }
}
