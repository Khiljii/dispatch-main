import jwt from 'jsonwebtoken';

export function getUserFromToken(token) {
  try {
    // Debugging: Ensure token and secret are correct
    // Verify and decode token

    const secret = "dispatch-system";
    console.log("token: ",token);
    console.log("process.env.TOKEN_SECRET: ",process.env.TOKEN_SECRET);
    const decoded = jwt.verify(token, secret);
    
    console.log("Decoded Token Data: ", decoded);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
