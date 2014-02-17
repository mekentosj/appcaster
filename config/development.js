module.exports = {
  rootUrl: 'http://localhost:3000',

  database: 'postgres://papers:test@localhost/appcaster',

  github: {
    client_id: '89eea4cf93edd3a92a89',
    callback: 'http://localhost:3000/auth/github/callback',
    secret: '0bcfd54ac2fa732ddc38e80e6bbb280892bb16ac'
  },

  users: {
    github: [
      'alexyoung'
    ]
  }
};
