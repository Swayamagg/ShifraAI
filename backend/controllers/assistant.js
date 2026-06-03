import User from "../models/user.js";

export const assistantConfig=async(req,res) => {
    try {
        const {userId}=req.params;
        const user=await User.findById(userId).select("-geminiApiKey");
        if(!user){
            return res.status(404).json({message:"failed to get user"})
        }
        return res.status(200).json({message:"Assistant config successfully",user})
    } catch (error) {
        return res.status(500).json({message:`error in assistant config ${error}`})
    }
}