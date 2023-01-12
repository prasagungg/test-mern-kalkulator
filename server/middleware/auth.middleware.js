import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { jwtConfig } from "../config";
import { User } from "../database/models";

// Jwt strategy
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.jwtSecret,
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);

    if (!user) {
      done(null, false, {
        message: "Invalid Token",
        data: null,
      });
      return null;
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(jwtStrategy);

export const authJwt = passport.authenticate("jwt", {
  session: false,
});
