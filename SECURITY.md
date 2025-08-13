# Security Policy for v1.0

## Version Support

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

Since this is our first stable release, we're focusing all security efforts on version 1.0.

## Reporting Vulnerabilities

### For Users:
If you find a security issue, please:
1. **Email us immediately**: security@yourproject.com  
   (Subject: "Security Vulnerability in [Feature Name]")
2. Include:
   - Where the vulnerability exists (e.g., login system, file uploads)
   - Steps to reproduce
   - Any error messages you saw

### What to Expect:
- We'll respond within **3 business days**
- You'll get updates as we work on a fix
- We'll credit you in our release notes (if you want)

### Critical Areas:
Pay special attention to:
- User authentication (`/controllers/authController.js`)
- File uploads (`/uploads/` directory)
- Database interactions (`/models/` files)

## Our Security Practices

For this first version, we're:
- Regularly checking dependencies for known vulnerabilities
- Using secure defaults in our configuration
- Reviewing all new code for common security issues

## Updates
Security patches will be released as version 1.0.x updates.

---

*Note: As this is our first version, our security processes will evolve with the project.*
