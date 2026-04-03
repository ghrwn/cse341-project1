const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { getDb } = require("../db/connect");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = getDb();
        const usersCollection = db.collection("users");

        let user = await usersCollection.findOne({ googleId: profile.id });

        if (!user) {
          const newUser = {
            googleId: profile.id,
            displayName: profile.displayName || "",
            email:
              profile.emails && profile.emails.length > 0
                ? profile.emails[0].value
                : "",
            createdAt: new Date()
          };

          const result = await usersCollection.insertOne(newUser);
          user = { ...newUser, _id: result.insertedId };
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = getDb();
    const { ObjectId } = require("mongodb");
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;