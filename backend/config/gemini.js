import User from "../models/user.js"

const Gemini_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent"

export const geminiResponse=async({prompt,apikey,user})=>{
try {
    if(!apikey){
        throw new Error("gemini api key missing")
    }
    const response=await fetch(`${Gemini_URL}?key=${apikey}`,{
        method:"POST",
        headers:{
            "Content-Type":application/json
        },
        body:JSON.stringify({
           contents:[
            {
                parts:[
                    {
                        text:prompt
                    }
                ]
            }
           ]
        })

    })
    if(!response.ok){

        if(response.status ===400 || response.status===401){
            user.geminiStatus="invalid"
            await user.save()
        }
        if(response.status ===429){
            user.geminiStatus="Quota exceeded"
            await user.save()
        }
        const err=await response.text()
        throw new Error(err)
    }
     user.geminiStatus="active";
     await user.save()

    const data=response.json()
    const text=data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if(!text){
        throw new Error("No text returned from gemini");
    }
    return text.trim()
} catch (error) {
    console.error("Gemini Fetch Error:",error.message);
    throw new Error("Gemini API fetch failed!");
}
}
