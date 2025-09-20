
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function signAccessToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }   // short expiry
  );
}

function signRefreshToken(user) {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
}

// Helper to set cookie
function setRefreshCookie(res, token) {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7*24*60*60*1000 // 7 days
  });
}

exports.register = async (req,res)=>{
  const { name,email,password } = req.body;
  const exists = await User.findOne({ email });
  if(exists) return res.status(400).json({message:"Email already exists"});

  const passwordHash = await bcrypt.hash(password,10);
  const user = await User.create({ name,email,passwordHash });

  const access = signAccessToken(user);
  const refresh = signRefreshToken(user);
  setRefreshCookie(res, refresh);

  res.json({ accessToken: access, user });
};

exports.login = async (req,res)=>{
  const { email,password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({message:"Invalid credentials"});
  const ok = await bcrypt.compare(password,user.passwordHash);
  if(!ok) return res.status(400).json({message:"Invalid credentials"});

  const access = signAccessToken(user);
  const refresh = signRefreshToken(user);
  setRefreshCookie(res, refresh);

  res.json({ accessToken: access, user });
};

exports.googleAuth = async (req,res)=>{
  const { idToken } = req.body;
  const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
  const payload = ticket.getPayload();
  const { sub: googleId, email, name, picture } = payload;

  let user = await User.findOne({ email });
  if(!user){
    user = await User.create({ name,email,googleId,avatarUrl:picture });
  }

  const access = signAccessToken(user);
  const refresh = signRefreshToken(user);
  setRefreshCookie(res, refresh);

  res.json({ accessToken: access, user });
};

// Refresh endpoint
exports.refresh = async (req,res)=>{
  try {
    const token = req.cookies.refreshToken;
    if(!token) return res.status(401).json({message:"No refresh token"});
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.id);
    if(!user) return res.status(401).json({message:"Invalid refresh token"});
    const access = signAccessToken(user);
    res.json({ accessToken: access });
  } catch(err){
    res.status(401).json({message:"Invalid refresh token"});
  }
};

// Logout
exports.logout = (req,res)=>{
  res.clearCookie("refreshToken");
  res.json({ message:"Logged out" });
};
