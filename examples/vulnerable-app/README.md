# Vulnerable Express Application - Testing Suite

## ⚠️ WARNING: DO NOT USE IN PRODUCTION ⚠️

This code contains intentional security vulnerabilities and code quality issues for testing purposes only. It is designed to test AI agents and code review tools.

## Security Vulnerabilities Included

### 1. **Hardcoded Credentials** (CWE-798)
- Location: `lib/security-test.js` lines 17-18
- API keys and database passwords hardcoded in source code
- Severity: CRITICAL

### 2. **SQL Injection** (CWE-89)
- Location: `lib/security-test.js` line 27
- User input directly concatenated into SQL query without sanitization
- Example: `"SELECT * FROM users WHERE id = '" + userId + "'"`
- Severity: CRITICAL

### 3. **Command Injection** (CWE-78)
- Location: `lib/security-test.js` line 39
- User input passed directly to shell command via `exec()`
- Example: `'cat /tmp/' + filename`
- Severity: CRITICAL

### 4. **Weak Random Number Generation** (CWE-330)
- Location: `lib/security-test.js` line 53
- Using `Math.random()` for security-sensitive session token generation
- Severity: HIGH

### 5. **Weak Cryptographic Algorithm** (CWE-327)
- Location: `lib/security-test.js` lines 63-64
- Using MD5 for password hashing (cryptographically broken)
- Severity: CRITICAL

### 6. **Cross-Site Scripting (XSS)** (CWE-79)
- Location: `lib/security-test.js` line 74
- User input directly embedded in HTML without escaping
- Example: `'<h1>Welcome ' + username + '</h1>'`
- Severity: HIGH

### 7. **Timing Attack Vulnerability** (CWE-208)
- Location: `lib/security-test.js` line 84
- Using `===` for sensitive string comparison allows timing attacks
- Severity: MEDIUM

### 8. **Use of eval()** (CWE-95)
- Location: `lib/security-test.js` line 103
- Direct use of `eval()` with user-controlled input
- Severity: CRITICAL

### 9. **Path Traversal** (CWE-22)
- Location: `lib/security-test.js` line 116
- File path from user not sanitized, allows reading arbitrary files
- Example: `../../../../etc/passwd`
- Severity: CRITICAL

### 10. **Insecure Cookie Configuration** (CWE-614)
- Location: `lib/security-test.js` lines 127-129
- Session cookie without `httpOnly` and `secure` flags
- Severity: MEDIUM

### 11. **Information Exposure** (CWE-209, CWE-532)
- Location: `lib/security-test.js` lines 138-140
- Debug code exposes sensitive credentials in logs
- Location: `examples/vulnerable-app/index.js` lines 90-93
- Stack traces exposed to end users
- Severity: MEDIUM to HIGH

### 12. **Unrestricted CORS** (CWE-942)
- Location: `examples/vulnerable-app/index.js` lines 14-17
- CORS configured to allow all origins (`*`)
- Severity: MEDIUM

## Code Quality Issues

### 1. **Console Statements in Production Code**
- Multiple console.log/console.error statements throughout
- Locations: lines 28, 42, 44, 138-140 in security-test.js

### 2. **Missing Error Handling**
- Location: `lib/security-test.js` line 100
- JSON.parse without try-catch block

### 3. **Debug Endpoints in Production**
- Location: `examples/vulnerable-app/index.js` lines 82-87
- Debug endpoint that logs sensitive information

### 4. **Missing Input Validation**
- Throughout both files, no validation of user inputs

### 5. **Improper Error Response**
- Location: `examples/vulnerable-app/index.js` lines 90-95
- Error handler exposes internal error details

## Files Created

1. `/lib/security-test.js` - Contains vulnerable utility functions
2. `/examples/vulnerable-app/index.js` - Express application using vulnerable functions

## Testing Your AI Agent

Your AI code review agent should identify and report:

1. All critical security vulnerabilities (SQL injection, command injection, XSS, etc.)
2. Weak cryptography usage
3. Hardcoded secrets
4. Information disclosure issues
5. Code quality problems (console statements, missing error handling)
6. Insecure configurations (cookies, CORS)

## Expected Findings Summary

- **Critical**: 7 issues
- **High**: 3 issues
- **Medium**: 4 issues
- **Low/Info**: 5 issues

**Total**: ~19 distinct security and code quality issues

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE/SANS Top 25](https://cwe.mitre.org/top25/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
