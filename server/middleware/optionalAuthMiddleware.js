export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const user = await verifyToken(token);
      req.userId = user.id;
    }

    next();
  } catch (error) {
    next();
  }
};