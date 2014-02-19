var assert = require('assert');
var config = require('./../../config');

describe('config', function() {
  describe('GitHub usernames', function() {
    it('should work with one name', function() {
      var expectedNames = ['alexyoung'];
      var parsedNames = config.parseGitHubUsers('alexyoung');
      console.log
      assert.deepEqual(parsedNames, expectedNames);
    });

    it('should parse strings of GitHub usernames', function() {
      var expectedNames = ['alexyoung', 'mz2', 'benb'];
      var parsedNames = config.parseGitHubUsers('alexyoung,mz2,benb');
      console.log
      assert.deepEqual(parsedNames, expectedNames);
    });

    it('should strip extra spaces', function() {
      var expectedNames = ['alexyoung', 'mz2', 'benb'];
      var parsedNames = config.parseGitHubUsers('alexyoung ,mz2, benb ');
      console.log
      assert.deepEqual(parsedNames, expectedNames);
    });
  });
});
