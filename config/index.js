var env = process.env.NODE_ENV || 'development';

function parseGitHubUsers(users) {
  return users.split(',').map(function(username) {
    return username.trim();
  });
}

if (env === 'production') {
  module.exports = {
    rootUrl: process.env.AC_ROOT_URL,
    database: process.env.AC_DATABASE_URL,
    github: {
      client_id: process.env.AC_GITHUB_CLIENT_ID,
      callback: process.env.AC_GITHUB_CALLBACK_URL,
      secret: process.env.AC_GITHUB_SECRET
    },
    users: {
      github: parseGitHubUsers(process.env.AC_GITHUB_USERS)
    }
  };
} else {
  module.exports = require('./' + env);
}

module.exports.parseGitHubUsers = parseGitHubUsers;
