import { NextApiRequest, NextApiResponse } from "next";
import baseHandler from "utils/baseApiHandler";
import jwt from "jsonwebtoken";

const handler = baseHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.headers["authorization"]?.split("Bearer ")[1];
    if (!token)
      return res.status(401).json({
        error:
          "Token missing, unauthorized access, please login and try again.",
      });
    jwt.verify(token, process.env.JWT_SECRET as string);
    return res.status(200).end();
  } catch (err) {
    return res.status(401).json({
      error: "Token invalid, unauthorized access, please login and try again.",
    });
  }
});

export default handler;
