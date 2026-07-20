import{ signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../utils/firebase.js'
import api from '../utils/axios.js'

const App = () => {

  const handleLogin = async (token) => {
    try{
       const data = await api.post("/auth/login",{token})
        console.log(data)
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
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <button className="h-24 w-50 bg-blue-500"
      onClick={googleLogin}
      >  
        continue with Google
      </button>
    </div>
  )
}

export default App