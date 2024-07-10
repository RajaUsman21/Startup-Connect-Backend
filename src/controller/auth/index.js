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
          .json({ message: "Email and password are required", status: 0 });
      }
      const user = await UserModel.findOne({
        where: { email: payload.email },
      });

      if (user) {
        return res
          .json({ message: "User with this email already exists", status: 0 });
      }

      const hPassword = await hash(payload.password, 10);

      await UserModel.create({
        ...payload,
        password: hPassword,
      });

      return res.status(200).json({ message: "User Registered", status: 1 });
    } catch (error) {
      console.error("Signup error: ", error);
      res.json({ message: "Internal server error", error ,status:0});
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      let user = await UserModel.findOne({
        where: { email },
      });

      if (!user) {
        return res.json({ message: "Invalid credentials", status:0 });
      }

      user = user.toJSON();

      const checkPassword = await compare(password, user.password);
      if (!checkPassword) {
        return res.json({ message: "Invalid credentials" ,status:0});
      }

      delete user.password;
      const id=user.id;

      const token = jwt.sign({id,email}, "asdbavsdasvd", { expiresIn: "1h" });

      res.json({ message:"Login Successful" ,data: user, token ,status:1});
    } catch (error) {
      console.error("SignIn error: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default AuthController;
