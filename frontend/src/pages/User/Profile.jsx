 import {useEffect,useState} from "react"
 import {useDispatch,useSelector} from "react-redux"
 import {toast} from "react-toastify"
import Loader from "../../components/Loader"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { Link } from "react-router-dom"
import { useProfileMutation } from "../../redux/api/usersApiSlice"
 
const Profile = () => {
    const [username,setUsername]  = useState('') 
    const [email,setEmail]  = useState('') 
    const [password,setPassword]  = useState('') 
    const [confirmPassword,setConfirmPassword]  = useState('')  

    const {userInfo} = useSelector((state)=>state.auth)

    useEffect(()=>{
        setUsername(userInfo?.username)
        setEmail(userInfo?.email)
    },[userInfo.email,userInfo.email])

    const dispatch = useDispatch()
  return (
    <div className="container mx-auto p-4 mt-[10rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4">
            <div className="md:w-1/3">
               
                    <h2 className="mb-4 text-2xl font-semibold text-black">Update Profile</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="username" className="block mb-2">Name</label>
                            <input type="text" className="w-full p-4 rounded form-input" value={username} onChange={e=>setUsername(e.target.value)}/>

                        </div>
                    </form>
               
            </div>
        </div>
    </div>
  )
}

export default Profile


/**
 *  <div className="flex justify-center align-center md:flex md:space-x-4">
            <h2 className="mb-4 text-2xl font-semibold text-black">Update Profile</h2>
            <form>
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-2">Name</label>
                    <input type="text" className="w-full p-4 rounded form-input" value={username} onChange={e=>setUsername(e.target.value)}/>

                </div>
            </form>
        </div>
 * 
 */