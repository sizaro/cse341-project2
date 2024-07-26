require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const { createUserOauth, findUserByGoogleIdOauth, findUserByGithubIdOauth } = require('../models/user-model');

// Determine callback URLs based on the environment
let googleCallbackURL = process.env.NODE_ENV === 'production'
    ? process.env.GOOGLE_CALLBACK_URL_PRODUCTION
    : process.env.GOOGLE_CALLBACK_URL_LOCAL;

let githubCallbackURL = process.env.NODE_ENV === 'production'
    ? process.env.GITHUB_CALLBACK_URL_PRODUCTION
    : process.env.GITHUB_CALLBACK_URL_LOCAL;

// Serialize user to store in session
passport.serializeUser((user, done) => {
    done(null, user); 
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
    done(null, user); 
});

// Google Strategy
passport.use(
    new GoogleStrategy({
        callbackURL: googleCallbackURL,
        clientID: process.env.googleClientID,
        clientSecret: process.env.googleClientSecret,
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('Google authentication worked');
        console.log(profile);
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
    })
);

// GitHub Strategy
passport.use(
    new GithubStrategy({
        callbackURL: githubCallbackURL,
        clientID: process.env.githubClientID,
        clientSecret: process.env.githubClientSecret,
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('GitHub authentication worked');
        console.log(profile);
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
            console.error('Error in GitHub strategy callback:', err);
            done(err, null);
        }
    })
);
