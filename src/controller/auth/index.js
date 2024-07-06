import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../../model/user/index.js";

const AuthController = {
  signup: async (req, res) => {
    const payload = req.body;
    try {
      
      console.log("====================================");
      console.log({ payload });
      console.log("====================================");

      if (!payload.email || !payload.password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }
      const user = await UserModel.findOne({
        where: { email: payload.email },
      });

      if (user) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }

      const hPassword = await hash(payload.password, 10);

      await UserModel.create({
        ...payload,
        password: hPassword,
      });

      return res.status(201).json({ message: "User Registered" });
    } catch (error) {
      console.error("Signup error: ", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      let user = await UserModel.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      user = user.toJSON();

      const checkPassword = await compare(password, user.password);
      if (!checkPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      delete user.password;

      const token = jwt.sign(user, "asdbavsdasvd", { expiresIn: "1h" });

      res.status(200).json({ data: user, token });
    } catch (error) {
      console.error("SignIn error: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default AuthController;
