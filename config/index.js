var fs = require('fs');
var env = process.env.NODE_ENV || 'development';
process.env.AC_GITHUB_USERS = process.env.AC_GITHUB_USERS || ['alexyoung'];

function parseGitHubUsers(users) {
  return users.split(',').map(function(username) {
    return username.trim();
  });
}

// Use environmental variables by default
module.exports = {
  rootUrl: process.env.AC_ROOT_URL,
  database: process.env.AC_DATABASE_URL,
  github: {
    client_id: process.env.AC_GITHUB_CLIENT_ID || 'Not set',
    callback: process.env.AC_GITHUB_CALLBACK_URL || 'Not set',
    secret: process.env.AC_GITHUB_SECRET || 'Not set'
  },
  users: {
    github: parseGitHubUsers(process.env.AC_GITHUB_USERS)
  }
};

if (fs.existsSync('config/' + env + '.js')) {
  module.exports = require('./' + env);
}

module.exports.parseGitHubUsers = parseGitHubUsers;
