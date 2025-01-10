import jwt from 'jsonwebtoken';

const isLoggedIn=async(req,res,next)=>{
    try {
          const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthenticated, please log in again." });
        };

        const userDetails = jwt.verify(token, process.env.JWT_SECRET);
        req.user = userDetails; 
        next(); 
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token, access denied." });
    };
};

const authorizedRoles = (...roles) => async (req, res, next) =>{
    const currentUserRole = req.user?.role;
    if (!roles.includes(currentUserRole)) {
        return res.status(400).json("you do not have access this page");
        
    };
    next();

};


export { isLoggedIn,authorizedRoles};