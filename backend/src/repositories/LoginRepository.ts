import LoginModel from "../models/LoginModel";

export default class LoginRepository {
  private login: LoginModel;

  constructor() {
    this.login = new LoginModel({
      user: "",
      password: "",
      email: "",
      completeName: "",
    });
  }

  public find(): LoginModel {
    return this.login;
  }

  public insert(login: LoginModel) {
    const newLogin = new LoginModel({
      user: login.user,
      completeName: login.completeName,
      email: login.email,
      password: login.password,
    });

    this.login = newLogin;
  }
}
