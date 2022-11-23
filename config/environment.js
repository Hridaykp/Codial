const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
})


const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'something',
    db: 'codial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'tempmail21498@gmail.com',
            pass: 'oypbcismiaexnrqu'
        }
    },
    google_client_id: "787816735509-d63jbv5vsvkob716lsb0kir4li3550ma.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: "codial",
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
};


const production = {
    name: 'production',
    asset_path: process.env.CODIAL_ASSET_PATH,
    session_cookie_key: process.env.CODIAL_SESSION_COOKIE_KEY,
    db: process.env.CODIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODIAL_GMAIL_USERNAME,
            pass: process.env.CODIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CODIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}


module.exports = eval(process.env.CODIAL_ENVIRONMENT) != undefined? development: eval(process.env.CODIAL_ENVIRONMENT);