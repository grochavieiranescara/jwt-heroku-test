import jwt from "jsonwebtoken";
import { executeDB } from "../utils/pgConnection.js";

class UserController {
  async index(req, res) {
    res.status(200).json({
      message: "Hello World",
    });
  }

  async create(req, res) {
    const { name, username, password } = req.body;
    if (name && username && password) {
      const checkUser = await executeDB(
        `SELECT * FROM users WHERE username = '${username}'`
      );
      if (checkUser.rowCount > 0) {
        res.status(400).json({
          error: true,
          message: "Nome de usuário já existe no sistema",
        });
      } else {
        const result = await executeDB(
          `INSERT INTO users(name, username, password) VALUES('${name}', '${username}', '${password}')`
        );
        console.log(result);
        res.json({ error: false, message: "Usuário criado com sucesso!" });
      }
    } else {
      res.status(400).json({
        error: true,
        message: "Os dados necessários não foram preenchidos...",
      });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const result = await executeDB(`SELECT * FROM users WHERE Id = '${id}'`);
    res.json({ user: result.rows });
  }

  async showAll(req, res) {
    console.log(req.userId + " fez esta chamada!");
    const result = await executeDB("SELECT * FROM users");
    res.json({ users: result.rows });
  }

  async login(req, res) {
    const { username, password } = req.body;
    if (username && password) {
      const result = await executeDB(
        `SELECT * FROM users WHERE username = '${username}' AND password = '${password}' LIMIT 1`
      );
      console.log(result);
      if (result.rowCount === 1) {
        const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE_TIME,
        });
        return res.json({
          auth: true,
          token,
        });
      } else {
        res.status(401).json({
          error: true,
          message: "Usuário não existe, ou senha preenchida incorretamente...",
        });
      }
    } else {
      res.status(400).json({
        error: true,
        message: "Usuário ou Senha não foram preenchidos...",
      });
    }
  }

  async logout(req, res) {
    res.end();
  }
}

export default UserController;
