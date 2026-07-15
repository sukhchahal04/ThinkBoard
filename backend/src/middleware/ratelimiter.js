import rateLimit  from "../config/upstash.js";


const ratelimiter=async (req,res,next)=>{
    try{
        const {success}= await rateLimit.limit("my key")
        if(!success){
            return res.status(429).json({message:"Too many requests"})
        }
        next()
    }
    
    catch (error) {
        console.error("Rate Limit Error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
        next(error);
    }

};

export default ratelimiter;