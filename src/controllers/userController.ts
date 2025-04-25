import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { createUser,getUserByUsername } from "../models/userModel";

export const registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            res.status(400).json({ message: "Username already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(username, hashedPassword);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username);
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        req.session.username = user;
        console.log(user);
        console.log(req.session.username);
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logoutUser = (req: Request, res: Response) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Errore durante il logout.' });
      }
      res.status(200).json({ message: 'Logout effettuato con successo!' });
    });
  };
