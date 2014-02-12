module.exports = {
  apps: {
    mac: {
      title: 'Papers for Mac',
      platform: 'Mac OS X'
    },

    win: {
      title: 'Papers for Windows',
      platform: 'Windows'
    }
  },

  channels: {
    beta: {
      title: 'Papers beta'
    },

    release: {
      title: 'Papers'
    }
  },

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
