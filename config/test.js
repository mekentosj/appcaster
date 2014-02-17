module.exports = {
  rootUrl: 'http://localhost:3001',

  database: 'postgres://papers:test@localhost/appcaster-test',

  github: {
    client_id: '1',
    callback: 'http://localhost:3000/auth/github/callback',
    secret: 'secret'
  },

  users: {
    github: [
      'alexyoung'
    ]
  }
};
