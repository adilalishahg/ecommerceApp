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
    const [updateProfile, { isLoading: loadingUpdateProfile }] =useProfileMutation();
    useEffect(()=>{
        setUsername(userInfo?.username)
        setEmail(userInfo?.email)
    },[userInfo.email,userInfo.email])

    const dispatch = useDispatch()

    const submitHandler =  async (e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error("Password do not match")
        }else{
            try {
                const res = await updateProfile({id:userInfo._id,username,email,password}).unwrap()
                dispatch(setCredentials({ ...res }));
                toast.success("Profile updated successfully");
            } catch (error) {
                toast.error(error?.data?.message||error.message)
            }
        }

    }
  return (
    <div className="container mx-auto p-4 mt-[5rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4">
            <div className="md:w-1/3">
                    <h2 className="mb-4 text-2xl font-semibold ">Update Profile</h2>
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block mb-2">Name</label>
                            <input placeholder="Enter your name" type="text" className="w-full p-4 rounded form-input border-2 border-indigo-600/[.55]" value={username} onChange={e=>setUsername(e.target.value)}/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2">Email</label>
                            <input placeholder="Enter your email" type="email" className="w-full p-4 rounded form-input border-2 border-indigo-600/[.55]" value={email} onChange={e=>setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-2">Password</label>
                            <input placeholder="Enter your password" type="password" className="w-full p-4 rounded form-input border-2 border-indigo-600/[.55]" value={password} onChange={e=>setPassword(e.target.value)}/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
                            <input placeholder="Enter your confirm password" type="password" className="w-full p-4 rounded form-input border-2 border-indigo-600/[.55]" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
                        </div>
                        <div className="flex justify-between">
                            <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">Update</button>
                            <Link to="/user-orders" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">My Orders</Link>
                        </div>
                    </form>
            </div>
            {loadingUpdateProfile&& <Loader/>}
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