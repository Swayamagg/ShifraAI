import { geminiResponse } from "../config/gemini.js";
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



export const askAssistant=async(req,res)=>{
    try{
    const {message,userId}=req.body;
    if(!message || !userId){
        return res.status(400).json({message:"message and userid are required"})
    }

    const user=await User.findById(userId)
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    if(!user.geminiApiKey){
       return res.status(404).json({message:"api key is not failed"})
    }
    if(user.plan==="free" && user.totalMsg >= user.reqLimit){
      return res.status(400).json({message:"Free limit reached"})
    }
    if(user.plan === "pro" && new Date(user.proExpiresAt) < new Date()){
        user.plan ="free"
        await user.save()
        return res.status(400).json({message:"Pro plan expired"})
    }

    const cleanMsg=message.toLowerCase()
    if(user.enableNavigation){
         const navigationWords=["open","go","start","show","navigate","take me"];
         const wantsNavigation=navigationWords.some((word)=>cleanMsg.startsWith(word));
         if(wantsNavigation){
            const matchedPage=user.pages.find((page)=>
                page.keywords.some((keyword)=>
                    cleanMsg.includes(keyword.toLowerCase())
                )
            );
            if(matchedPage){
                if(req.body.currentPath===matchedPage.path){
                    return res.json({success:true,response:`${matchedPage.name} already open`})
                }
                return res.json({
                    success:true,
                    action:"navigate",
                    path:matchedPage.path,
                    response:`Opening ${matchedPage.name}`
                })
            }
         }
    }
    const prompt=`
    You are ${user.assistantName}

    Buisness Name:
    ${user.businessName}
   
    Buisness Type:
    ${user.buisnessType}

    Buisness Description:
    ${user.businessDescription}

    Assistant Tone:
    ${user.tone}


    Rules:

    - Keep replies under 15 words
    - Give fast direct responses
    - Talk naturally
    - Behave like smart voice assistant
    - Avoid long explanations
    - Keep responses short for quick voice playback

    User Question:
    ${message}

    `;

    const aiResponse=await geminiResponse({prompt,apikey:user.geminiApiKey,user})
        if(user.plan === "free"){
            user.totalMsg +=1;
            await user.save()
        }
        return res.json({
                success:true,
                aiResponse
            });
  }catch(err){
    console.log(err)
     return res.status(500).json({
        success:false,
        message:"Assistant AI error"
    })
  }
}