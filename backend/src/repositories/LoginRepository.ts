import LoginModel from "../models/LoginModel";
import { Database } from "../config/db";

// // UP() - Open the database connection
// (async () => {
//   const db = new Database();
//   await db.up();
// })();

// // Perform database operations here (if needed)

// // DOWN() - Close the database connection
// (async () => {
//   const db = new Database();
//   await db.down();
// })();

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
