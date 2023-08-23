import jwt from "jsonwebtoken";

// Middleware to authenticate user
function auth(req, res, next) {
  // Get the JWT token from the request header
  const token = req.header("x-auth-token");
  
  // Check if a token exists
  if (!token) return res.status(401).send("Access denied. Not authorized...");
  
  try {
    // Get the JWT secret key from environment variables
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    
    // Verify the token using the secret key
    const decoded = jwt.verify(token, jwtSecretKey);
    
    // Attach the decoded user information to the request object
    req.user = decoded;
    
    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // Send an error response if token verification fails
    res.status(400).send("Invalid auth token...");
  }
}

export default auth;
