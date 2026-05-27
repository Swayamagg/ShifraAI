import React from 'react'
import { useState } from 'react'

const themes={
    dark:{
        bg:"bg-[#050816]",
        overlay:"bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_45%)]",
        orb:"from-cyan-500 via-purple-500 to-pink-500",
        cardBorder:"border border-white/10",
        text:"text-white",
        sub:"text-white/65",
        listening:"text-emerald-400",
        wave:"bg-emerald-400",
        button:"from-purple-500 to-violet-400",
        micGlow:"shadow-[0_0_60px_rgba(168,85,247,0.45)]"
    },
     light:{
        bg:"bg-gradient-to-br from-white via-[#f8fafc] to-[#eef6ff]",
        overlay:"bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_45%)]",
        orb:"from-blue-300 via-cyan-500 to-pink-300",
        cardBorder:"border border-[#dbeafe]",
        text:"text-[#081028]",
        sub:"text-[#475569]",
        listening:"text-blue-500",
        wave:"bg-blue-500",
        button:"from-blue-400 to-cyan-400",
        micGlow:"shadow-[0_0_70px_rgba(59,130,246,0.35)]"
    },
     glass:{
        bg:"bg-black/20 backdrop-blur-[45px]",
        overlay:"bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]",
        orb:"from-cyan-200 via-violet-300 to-fuchsia-300",
        cardBorder:"border border-white/10",
        text:"text-white",
        sub:"text-white/70",
        listening:"text-cyan-200",
        wave:"bg-cyan-200",
        button:"from-cyan-200 to-violet-500",
        micGlow:"shadow-[0_0_70px_rgba(34,211,238,0.35)]"
    },
    neon:{
        bg:"bg-[#03120d]",
        overlay:"bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_45%)]",
        orb:"from-emerald-300 via-green-400 to-cyan-400",
        cardBorder:"border border-emerald-400/20",
        text:"text-emerald-50",
        sub:"text-emerald-100/70",
        listening:"text-emerald-300",
        wave:"bg-emerald-300",
        button:"from-emerald-400 to-green-500",
        micGlow:"shadow-[0_0_70px_rgba(16,185,129,0.45)]"
    },
}
const AssistantPreview = () => {
    const [theme,setTheme]=useState("dark")
    const current=themes[theme]
  return (
    <div className='flex items-center justify-center px-3 sm:px-4 py-10 sm:py-14'>
        <div className={`relative w-[280px] h-[450px] sm:w-[330px] sm:h-[500px] md:w-[380px] md:h-[550px] rounded-[32px] sm:rounded-[42px] overflow-hidden transition-all duration-500
            ${current.bg} ${current.cardBorder} shadow-[0_20px_80px_rgba(0,0,0,0.28)]`}>
            <div className={`absolute inset-0 ${current.overlay}`}/>
            <div className='absolute top-4 right-5 sm:top-5 sm:right-5 z-30 flex items-center gap-2'>
                <button onClick={()=>setTheme("dark")} className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#050816] border transition-all cursor-pointer
                ${theme === "dark" ?"border-purple-400 scale-110":"border-white/20"}`}/>
                <button onClick={()=>setTheme("light")} className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border transition-all cursor-pointer
                ${theme === "light" ?"border-blue-400 scale-110":"border-gray-300"}`}/>
                <button onClick={()=>setTheme("glass")} className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-white/20 to-white/20 border transition-all cursor-pointer
                ${theme === "glass" ?"border-white scale-110":"border-white/20"}`}/>
                <button onClick={()=>setTheme("neon")} className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 border transition-all cursor-pointer
                ${theme === "neon" ?"border-emerald-300 scale-110":"border-transparent"}`}/>
            </div>
        </div>
    </div>
  )
}

export default AssistantPreview