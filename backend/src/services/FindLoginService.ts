import LoginModel from "../models/LoginModel";
import LoginRepository from "../repositories/LoginRepository";

export default class FindLoginService {
  private login: LoginRepository;

  constructor(login: LoginRepository) {
    this.login = login;
  }

  public execute({ user, password }: LoginModel): LoginModel {
    const login = this.login.find();
    return login;
  }
}
