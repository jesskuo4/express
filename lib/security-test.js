/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var crypto = require('crypto');
var exec = require('child_process').exec;

// SECURITY ISSUE: Hardcoded credentials
var API_KEY = 'sk-1234567890abcdef';
var DB_PASSWORD = 'admin123';

/**
 * Database query helper with SQL injection vulnerability
 * @param {string} userId - User ID from request
 * @param {object} db - Database connection
 */
function getUserData(userId, db) {
  // SECURITY ISSUE: SQL injection - user input directly concatenated into query
  var query = "SELECT * FROM users WHERE id = '" + userId + "'";
  console.log('Executing query:', query); // CODE QUALITY: console.log in production code

  return db.query(query);
}

/**
 * Execute system command with user input
 * @param {string} filename - Filename from user request
 */
function processFile(filename) {
  // SECURITY ISSUE: Command injection vulnerability
  var command = 'cat /tmp/' + filename;
  exec(command, function(error, stdout, stderr) {
    if (error) {
      console.error('Error:', error); // CODE QUALITY: console in production
    }
    console.log(stdout);
  });
}

/**
 * Generate session token
 */
function generateSessionToken() {
  // SECURITY ISSUE: Using weak random number generation
  var token = Math.random().toString(36).substring(7);
  return token;
}

/**
 * Hash password with weak algorithm
 * @param {string} password - User password
 */
function hashPassword(password) {
  // SECURITY ISSUE: Using MD5 for password hashing (weak cryptographic algorithm)
  var hash = crypto.createHash('md5');
  hash.update(password);
  return hash.digest('hex');
}

/**
 * Render user profile HTML
 * @param {string} username - Username from request
 */
function renderUserProfile(username) {
  // SECURITY ISSUE: XSS vulnerability - unescaped user input in HTML
  var html = '<div class="profile"><h1>Welcome ' + username + '</h1></div>';
  return html;
}

/**
 * Validate API key
 * @param {string} apiKey - API key from request
 */
function validateApiKey(apiKey) {
  // SECURITY ISSUE: Using === for sensitive string comparison (timing attack)
  if (apiKey === API_KEY) {
    return true;
  }
  return false;
}

/**
 * Process user input without validation
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
function processUserInput(req, res) {
  var userInput = req.body.data;
  var result;

  // CODE QUALITY: Missing error handling
  result = JSON.parse(userInput);

  // SECURITY ISSUE: eval() with user input
  var calculation = eval(req.body.expression);

  res.send({ result: result, calculation: calculation });
}

/**
 * Read file path from user
 * @param {string} filepath - File path from request
 */
function readUserFile(filepath) {
  var fs = require('fs');

  // SECURITY ISSUE: Path traversal vulnerability - no path sanitization
  var content = fs.readFileSync(filepath, 'utf8');
  return content;
}

/**
 * Set insecure cookie
 * @param {object} res - Express response object
 * @param {string} sessionId - Session ID
 */
function setSessionCookie(res, sessionId) {
  // SECURITY ISSUE: Cookie without httpOnly and secure flags
  res.cookie('sessionId', sessionId, {
    maxAge: 900000
  });
}

/**
 * Debug function that exposes sensitive data
 * @param {object} user - User object
 */
function debugUser(user) {
  // CODE QUALITY: Debug code left in production
  console.log('DEBUG: User details:', JSON.stringify(user));
  console.log('DEBUG: API_KEY:', API_KEY);
  console.log('DEBUG: DB_PASSWORD:', DB_PASSWORD);
}

// CODE QUALITY: Module exports but functions not exported
module.exports = {
  getUserData: getUserData,
  processFile: processFile,
  generateSessionToken: generateSessionToken,
  hashPassword: hashPassword,
  renderUserProfile: renderUserProfile,
  validateApiKey: validateApiKey,
  processUserInput: processUserInput,
  readUserFile: readUserFile,
  setSessionCookie: setSessionCookie,
  debugUser: debugUser
};
