import AppError from "../utils/errorUtil.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthenticated, please login again", 404));
  }

  const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = userDetails;
  next();
};

const authorizedRoles = (...roles) =>
  async function (req, res, next) {
    const currentUserRole = req.user.role;
    if (!roles.includes(currentUserRole)) {
      return next(
        new AppError("You do not have permissions to access this route")
      );
    }
    next();
};

const authorizeSubscriber = async(req, res, next) => {
  const subscription = req.user.subscription
  const currentUserRoles = req.user.role;

  if(currentUserRole !== 'ADMIN' && subscription.status !== 'active'){
    return next(new AppError('Please subscribe to access this route', 403))
  }
  next();
}

export { isLoggedIn, authorizedRoles, authorizeSubscriber };