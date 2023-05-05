import { NextApiRequest, NextApiResponse } from "next";
import baseHandler from "utils/baseApiHandler";
import jwt from "jsonwebtoken";
import { USER_CREDENTIALS } from "utils/constants";

const handler = baseHandler();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  const { email, password } = body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Bad request, email and password are required" });
    }
    if (
      email === USER_CREDENTIALS.email &&
      password === USER_CREDENTIALS.password
    ) {
      const token = jwt.sign(
        {
          email,
        },
        process.env.JWT_SECRET as string
      );
      return res.send({ token, name: USER_CREDENTIALS.name });
    } else return res.status(401).json({ error: "Invalid email or password" });
  } catch (err) {
    return res.status(500).json({ error: "Server error, please try again" });
  }
});

export default handler;
