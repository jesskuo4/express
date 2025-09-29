/**
 * Example Express application with security vulnerabilities
 * This is for testing purposes only - DO NOT USE IN PRODUCTION
 */

'use strict';

var express = require('../../');
var securityTest = require('../../lib/security-test');

var app = module.exports = express();

// SECURITY ISSUE: CORS enabled for all origins
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Route with SQL injection vulnerability
app.get('/user/:id', function(req, res) {
  var userId = req.params.id;

  // This will cause SQL injection
  var userData = securityTest.getUserData(userId, { query: function(q) { return { id: userId }; } });
  res.json(userData);
});

// Route with command injection vulnerability
app.post('/process', function(req, res) {
  var filename = req.body.filename;

  // CODE QUALITY: No input validation
  securityTest.processFile(filename);
  res.send('Processing file...');
});

// Route with XSS vulnerability
app.get('/profile/:username', function(req, res) {
  var username = req.params.username;

  // XSS vulnerability - unescaped user input
  var html = securityTest.renderUserProfile(username);
  res.send(html);
});

// Route with weak authentication
app.post('/login', function(req, res) {
  var password = req.body.password;

  // SECURITY ISSUE: Weak password hashing
  var hashedPassword = securityTest.hashPassword(password);

  // SECURITY ISSUE: Weak session token generation
  var sessionToken = securityTest.generateSessionToken();

  // SECURITY ISSUE: Insecure cookie
  securityTest.setSessionCookie(res, sessionToken);

  res.json({ success: true, token: sessionToken, hash: hashedPassword });
});

// Route with path traversal vulnerability
app.get('/read-file', function(req, res) {
  var filepath = req.query.path;

  // SECURITY ISSUE: Path traversal - no sanitization
  var content = securityTest.readUserFile(filepath);
  res.send(content);
});

// Route with eval vulnerability
app.post('/calculate', function(req, res) {
  // SECURITY ISSUE: eval with user input
  securityTest.processUserInput(req, res);
});

// Route that exposes sensitive information
app.get('/debug', function(req, res) {
  // CODE QUALITY: Debug endpoint left in production
  var user = { id: 1, username: 'admin', email: 'admin@example.com' };
  securityTest.debugUser(user);
  res.json({ message: 'Debug info logged to console' });
});

// CODE QUALITY: Error handler without proper error handling
app.use(function(err, req, res, next) {
  // SECURITY ISSUE: Exposing stack traces to users
  res.status(500).json({
    error: err.message,
    stack: err.stack
  });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Vulnerable Express app started on port 3000');
}
