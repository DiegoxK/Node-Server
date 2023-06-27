import { Request, Response } from "express";
import { promises as fsPromises } from "fs";
import bcrypt from "bcrypt";
import path from "path";
import users from "../models/users.json";

const usersDB = {
  users,
  setUsers: function (data: any) {
    this.users = data;
  },
};

const handleNewUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Please include all fields" });
  }

  const duplicateUser = usersDB.users.find(
    (user: any) => user.username === username
  );

  if (duplicateUser) {
    return res.status(400).json({ msg: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: usersDB.users.length + 1,
      username,
      password: hashedPassword,
    };

    usersDB.setUsers([...usersDB.users, newUser]);
    res.status(201).json(usersDB.users);
  } catch (error) {}
};
