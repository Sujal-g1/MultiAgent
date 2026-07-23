import{ signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../utils/firebase.js'
import api from '../../utils/axios.js'
import { FaGoogle } from "react-icons/fa";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';

const Home = () => {
 

  const {userData} = useSelector(state=>state.user)
  // console.log(userData);
  const dispatch = useDispatch()
  
  const handleLogin = async (token) => {
    try{
       const data = await api.post("/api/auth/login",{token})
        // console.log(data)
        dispatch(setUserData(data))
    }catch(error){
      console.log(error)
    }
  }

  const googleLogin = async ()=>{
   const data = await signInWithPopup(auth, googleProvider)
   const token =  await data.user.getIdToken()
   console.log(token);
   await handleLogin(token)
    console.log(data.user)
  }


  return (
    <div className='h-screen flex bg-[#0d0f14] text-white overflow-hidden'>

      {/* login  */}
    {!userData && 
     <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>

    <div className='w-85 bg-[#13151c] border border-white/8 rounded-2xl p-7 flex flex-col gap-5'>

    <div className='flex flex-col gap-1'>
        <h2 className='text-[17px] font-semibold text-slate-100 tracking-tight'>Welcome to MultiAgent</h2>

        <p className='text-[13px] text-slate-500'>Please login to continue</p>

        <button className='w-full flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-medium text-white bg-linear-to-br from-indigo-500 to-violet-700 hover:from-indigo-400 hover:to-violet-600 active:from-indigo-600 active:to-violet-800 border border-indigo-500/30 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-150 cursor-pointer'
        onClick={googleLogin}>
            <FaGoogle size={15}/>
            Continue with Google
        </button>
    </div>

    </div>
     </div>
     }

     

    </div>
  )
}

export default Home