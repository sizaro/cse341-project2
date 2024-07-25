const passport = require('passport');

const auth = {};

// Render the home page
auth.buildHome = async function (req, res) {
    try {
        // #swagger.tags=['we did it']
        res.render('home'); // Render home.ejs
    } catch (err) {
        res.status(500).json({ error: 'Error building home' });
    }
}

// Render the login page
auth.loginPage = function (req, res) {
    try {
        res.render('login'); // Render login.ejs
    } catch (err) {
        res.status(500).json({ error: 'Error rendering login page' });
    }
};

// Handle logout and render the logout page
auth.logOutPage = async function (req, res) {
    try {
        res.render('logout'); // Render logout.ejs
    } catch (err) {
        res.status(500).json({ error: 'Error rendering logout page' });
    }
};

// Handle login with Google
auth.loginGoogle = async function (req, res) {
    try {
        res.redirect('/auth/google'); // Redirect to Google authentication
    } catch (err) {
        res.status(500).json({ error: 'Error during Google login' });
    }
};

// Authenticate with Google
auth.authPage = passport.authenticate('google', {
    scope: ['profile']
});

// Handle Google callback
auth.handleGoogleCallback = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            // Pass the user object to the view
            res.render('userpage', { user: req.user }); // Render userpage.ejs and pass user data
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        res.status(500).json({ error: 'Error handling Google callback' });
    }
};

// Handle GitHub callback
auth.handleGithubCallback = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            // Pass the user object to the view
            res.render('userpage', { user: req.user }); // Render userpage.ejs and pass user data
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        res.status(500).json({ error: 'Error handling GitHub callback' });
    }
};

module.exports = auth;
