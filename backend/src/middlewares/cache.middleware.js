import redisClient from "../utils/redisClient.js";


export const cacheMiddleware= async(req,res, next)=>{


    const key= req.originalUrl;
    try {
       const cachedData= await redisClient.get(key); 
if(cachedData){
    return res.status(200).json(JSON.parse(cachedData));
}
  res.sendResponse = res.json;
  res.json= async(body)=>{
await redisClient.setEx(key,86400, JSON.stringify(body));
res.sendResponse(body);
  }
next();
    } catch (error) {
        return res.status(500).json({error: " Cache Internal Server Error"});
    }
}