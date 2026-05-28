import React, { useState } from 'react'

const themes=["light","dark","glass","neon"];
const tones=["friendly","professional","sales"];

const Builder = ({user,setUser}) => {
  const [assistantName,setAssistantName]=useState(user?.assistantName || "")
  const [businessName,setBusinessName]=useState(user?.businessName || "")
  const [businessType,setBusinessType]=useState(user?.businessType || "")
  const [businessDesc,setBusinessDesc]=useState(user?.businessDesc || "")
  const [theme,setTheme]=useState(user?.theme || "dark")
  const [tone,setTone]=useState(user?.tone || "friendly")
  const [geminiApiKey,setGeminiApiKey]=useState(user?.geminiApiKey || "")
  const [pages,setPages]=useState(user?.pages || [])
  const [pageName,setPageName]=useState("")
  const [pagePath,setPagePath]=useState("")
  const [pageKeywords,setPageKeywords]=useState("")

  return (
    <div className='min-h-screen bg-[#f7f8fc] px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-[#081028]'>Assistant Builder</h2>
          <p className='text-gray-500 mt-1'>Customize your virtual assistant</p>
        </div>
        <div className='space-y-6'>
          <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6'>
            <h2 className='text-lg font-semibold mb-5'>Basic Information</h2>
            <div className='space-y-4'>
              <input type="text" onChange={(e)=>setAssistantName(e.target.value)} value={assistantName} placeholder='Assistant Name' className='w-full border border-gray-200 rounded-2xl px-4 py-3' />
              <input type="text" onChange={(e)=>setBusinessName(e.target.value)} value={businessName} placeholder='Business Name' className='w-full border border-gray-200 rounded-2xl px-4 py-3' />
              <input type="text" onChange={(e)=>setBusinessType(e.target.value)} value={businessType} placeholder='Business Type' className='w-full border border-gray-200 rounded-2xl px-4 py-3' />
              <textarea rows={4} type="text" onChange={(e)=>setBusinessDesc(e.target.value)} value={businessDesc} placeholder='Business Description' className='w-full border border-gray-200 rounded-2xl px-4 py-3 resize-none' />
            </div>
          </div>
          <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
            <h2 className='text-lg font-semibold mb-5'>Appearance</h2>
            <div>
              <label className='text-sm text-gray-600 mb-3 block '>Theme</label>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                {themes.map((item)=>(
                  <button onClick={()=>setTheme(item)} key={item} className={`py-3 rounded-2xl border-2 capitalize ${theme === item ? "border-purple-500 bg-purple-50 text-purple-700" : "border-gray-200"}`}>{item}</button>
                ))}
              </div>
            </div>
            <div className='mt-6'>
              <label className='text-sm text-gray-600 mb-3 block '>Theme</label>
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                {tones.map((item)=>(
                  <button onClick={()=>setTone(item)} key={item} className={`py-3 rounded-2xl border-2 capitalize ${tone === item ? "border-purple-500 bg-purple-50 text-purple-700" : "border-gray-200"}`}>{item}</button>
                ))}
              </div>
            </div>
          </div>
          <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
            <div className='flex items-center justify-between  mb-5 gap-4 flex-wrap'>
              <div>
                <h2 className='text-lg font-semibold'>Gemini API Key</h2>
                <p className='text-sm mt-1 text-gray-400'>Add your Gemini API key to power your assistant</p>
              </div>
              <a href="http://aistudio.google.com/app/apikey" target='_blank' rel='noopener noreferrer' className='px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-sm text-white font-medium hover:scale=[1.02] transition-all cursor-pointer'>
                Get API Key
              </a>
            </div>
              <input type="password" onChange={(e)=>setGeminiApiKey(e.target.value)} value={geminiApiKey} placeholder='AIza......' className='w-full border border-gray-200 rounded-2xl px-4 py-3' />
              <p className='text-xs text-gray-400 mt-3 leading-6'>Your API key is securely stored and only used for generating AI responses.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Builder