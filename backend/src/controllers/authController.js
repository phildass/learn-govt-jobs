const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../models');
const logger = require('../config/logger');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

const generateOTP = () => {
  const length = parseInt(process.env.OTP_LENGTH) || 6;
  return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
};

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    // Generate OTP for verification
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + parseInt(process.env.OTP_EXPIRE_MINUTES || 10) * 60000);

    // Create user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      phone,
      phoneVerificationOTP: otp,
      otpExpiry,
      emailVerificationToken: crypto.randomBytes(32).toString('hex')
    });

    // TODO: Send verification email and OTP
    logger.info(`User registered: ${email}, OTP sent for verification`);

    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please verify your email and phone.',
      data: {
        user,
        token
      },
      disclaimer: process.env.DISCLAIMER_TEXT
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Update last login
    await user.update({ lastLoginAt: new Date() });

    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user,
        token
      },
      disclaimer: process.env.DISCLAIMER_TEXT
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed'
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await User.findOne({ where: { emailVerificationToken: token } });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid verification token'
      });
    }

    await user.update({
      isEmailVerified: true,
      emailVerificationToken: null
    });

    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    logger.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Email verification failed'
    });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    if (user.phoneVerificationOTP !== otp) {
      return res.status(400).json({
        success: false,
        error: 'Invalid OTP'
      });
    }

    if (new Date() > new Date(user.otpExpiry)) {
      return res.status(400).json({
        success: false,
        error: 'OTP expired'
      });
    }

    await user.update({
      isPhoneVerified: true,
      phoneVerificationOTP: null,
      otpExpiry: null
    });

    res.json({
      success: true,
      message: 'Phone verified successfully'
    });
  } catch (error) {
    logger.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      error: 'OTP verification failed'
    });
  }
};

exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + parseInt(process.env.OTP_EXPIRE_MINUTES || 10) * 60000);

    await user.update({
      phoneVerificationOTP: otp,
      otpExpiry
    });

    // TODO: Send OTP via SMS
    logger.info(`OTP resent for user: ${email}`);

    res.json({
      success: true,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    logger.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to resend OTP'
    });
  }
};

exports.forgotPassword = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Not implemented yet'
  });
};

exports.resetPassword = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Not implemented yet'
  });
};

exports.googleAuth = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'SSO not implemented yet'
  });
};

exports.googleCallback = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'SSO not implemented yet'
  });
};

exports.logout = async (req, res) => {
  // Client-side should remove token
  res.json({
    success: true,
    message: 'Logout successful'
  });
};

exports.refreshToken = async (req, res) => {
  try {
    const token = generateToken(req.user.id);
    res.json({
      success: true,
      data: { token }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Token refresh failed'
    });
  }
};

exports.getCurrentUser = async (req, res) => {
  res.json({
    success: true,
    data: { user: req.user }
  });
};
