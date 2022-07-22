import jwt from "jsonwebtoken";

export default function loginRequired(req, res, next) {
  const token = req.headers["x-access-token"];
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log("Error => ", err);
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Você não tem acesso a essa rota...",
      });
    }

    req.userId = decoded.userId;
    next();
  });
}
