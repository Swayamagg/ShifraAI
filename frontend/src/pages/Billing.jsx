import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ServerUrl } from '../App';

const Billing = ({user,setUser}) => {
  const navigate=useNavigate()

  useEffect(()=>{
   if(user && !user.isSetupComplete){
     toast.error("Setup your assistant first")
     navigate("/builder")
   }

  },[])
  const remainMsg=Math.max(0,(user?.reqLimit || 0)-(user?.totalMsg || 0));
  const remainDays=user?.proExpiresAt ? Math.max(
    0,
    Math.ceil(
      (
        new Date(user?.proExpiresAt)-new Date()
      )/
      (1000*60*60*24)
    )
   ) : 0 ;
  const handlePay=async () => {
    try {
      const res=await axios.post(ServerUrl + "/api/billing/order",{plan:"pro"},{withCredentials:true})

      const order=res.data.order;
      const options={
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:order.amount,
        currency:order.currency,
        name:"ShifraAI",
        description:"Pro Plan",
        order_id:order.id,
        handler:async(response)=>{
          const verify=await axios.post(ServerUrl + "/api/billing/verify",response,{withCredentials:true})
          if(verify.data.success){
            toast.success("Payment Successfull")
            setUser(verify.data.user)
          }
        },
        theme:{
          color:"#7c3aed"
        }
      }

      const razorpay=new Razorpay(options)
      razorpay.open()
    } catch (error) {
      toast.error("Payment Failed!")
      console.log(error)
    }
  }
  return (
    <div className='min-h-screen bg-[#f7f8fc] px-4 py-10'>
      <div className='max-w-5xl mx-auto '>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-[#081028]'>Billing & Subscription</h2>
          <p className='text-gray-500 mt-1'>Manage your AI assistant and plan usage.</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6'>
            <div className='rounded-3xl border border-gray-100 bg-white shadow-sm p-6'>
              <p className='text-sm text-gray-400'>Current Plan</p>
              <h2 className='text-xl font-bold mt-1 capitalize text-[#081028]'>{user?.plan}</h2>
            </div>
            <div className='rounded-3xl border border-gray-100 bg-white shadow-sm p-6'>
              <p className='text-sm text-gray-400'>Gemini Status</p>
              <h2 className={`text-xl font-bold mt-1 capitalize ${user?.geminiStatus === "active" ? "text-emerald-600" : user?.geminiStatus === "invalid" ? "text-red-500" : "text-amber-500" }`}>{user?.geminiStatus}</h2>
            </div>
            <div className='rounded-3xl border border-gray-100 bg-white shadow-sm p-6'>
              <p className='text-sm text-gray-400'>{user?.plan === "free" ? "Messages Left" : "Plan Expiry"}</p>
              <h2 className='text-xl font-bold mt-1 capitalize text-[#081028]'>{user?.plan === "free" ? remainMsg : remainDays} days</h2>
            </div>
           </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10'>
            {/* free */}
            <div className='bg-white rounded-3xl p-8 border border-gray-100 shadow-sm'>
              <h2 className='text-2xl font-bold text-[#081028]'>Free Plan</h2>
              <h3 className='text-5xl font-bold mt-5 text-[#081028]'>0</h3>
              <ul className='mt-6 space-y-4 text-gray-600'>
                <li>200 AI messages</li>
                <li>Voice assistant</li>
                <li>Navigation support</li>
                <li>Basic customization</li>
              </ul>
            </div>
            {/* pro */}
             <div className='text-white rounded-3xl p-8 bg-gradient-to-r from-purple-600 to-emerald-500 shadow-lg'>
              <h2 className='text-2xl font-bold text-[#081028]'>Pro Plan</h2>
              <h3 className='text-5xl font-bold mt-5 text-[#081028]'>699</h3>
              <p className='mt-2 opacity-80'>3 Months Access</p>
              <ul className='mt-6 space-y-4 opacity-90'>
                <li>Unlimited AI messages</li>
                <li>Advaanced AI assistant</li>
                <li>Priority performance</li>
                <li>Unlimited navigation</li>
                <li>Premium support</li>
              </ul>

              <button onClick={handlePay} disabled={user?.plan === "pro"} className={`mt-8 h-14 w-full rounded-2xl font-semibold transition ${user?.plan === "pro" ? "bg-emerald-200 text-black cursor-default":"bg-white text-[#081028] cursor-pointer"}`}>
                {user?.plan === "pro" ? "Active plan" : "Upgrade now"}
              </button>
            </div>
          </div>
      </div>
      

    </div>
  )
}

export default Billing