require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const GithubStrategy = require('passport-github2')
const { createUserOauth, findUserByGoogleIdOauth, findUserByGithubIdOauth } = require('../models/user-model');
const keys = require('./keys')

// Serialize user to store in session
passport.serializeUser((user, done) => {
    done(null, user); // Serialize entire user object
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
    done(null, user); // Deserialize entire user object
});

passport.use(
    new GoogleStrategy({
    callbackURL: 'http://localhost:3000/auth/google/redirect',
    clientID : keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    console.log('authentication worked')
    console.log(profile)
    try {
        let user = await findUserByGoogleIdOauth(profile.id);

        if (!user) {
            user = await createUserOauth({
                username: profile.displayName,
                oauthID: profile.id
            });
            console.log('New user created:', user);

        } else {
            console.log('User found:', user);
        }

        done(null, user);
    } catch (err) {
        console.error('Error in Google strategy callback:', err);
        done(err, null);
    }
}));


// passport authentication for using gihub


passport.use(
    new GithubStrategy({
    callbackURL: 'http://localhost:3000/auth/github/redirect',
    clientID : keys.github.clientID,
    clientSecret: keys.github.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    console.log('authentication worked')
    console.log(profile)
    try {
        let user = await findUserByGithubIdOauth(profile.id);

        if (!user) {
            user = await createUserOauth({
                username: profile.username,
                oauthID: profile.id
            });
            console.log('New user created:', user);

        } else {
            console.log('User found:', user);
        }

        done(null, user);
    } catch (err) {
        console.error('Error in github strategy callback:', err);
        done(err, null);
    }
}));
