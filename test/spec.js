var request = require('supertest');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('../src/app');
  });
  afterEach(function () {
    require('../src/app').stop();
  });
  it('responds to /posts', function testPosts(done) {
    request(server)
      .get('/posts')
      .expect(200, done);
  });
  it('404 everything else', function test404(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});
