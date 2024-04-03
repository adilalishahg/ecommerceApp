import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch,useSelector} from "react-redux"
import Loader from "../../components/Loader"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import { useRegisterMutation } from "../../redux/api/usersApiSlice"


const Register = () => {
  const [username,setUserName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("") 

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register,{isLoading}] = useRegisterMutation()
  const { userInfo } = useSelector((state) => state.auth);

  const {search} = useLocation()
  const sp = new URLSearchParams(search)

  const redirect = sp.get("redirect")||'/' 
  useEffect(()=>{
    if(userInfo){
      navigate(redirect)
    }
  },[navigate,redirect,userInfo])
  const submitHandler = async (e)=>{
    e.preventDefault()
    if(password !== confirmPassword){
      toast.error("Password do not match")
    }else{
      try {
        const res = await register({username,email,password}).unwrap()
        dispatch(setCredentials({...res}))
        toast.success('User Successfully Registered')
      } catch (error) {
        console.log(error)
        toast.error(error?.data?.message||error.message)
      }
    }
  }
  return (

    <section className="pl-[10rem] flex ">
      <div className="mr-[4rem] mt-[5rem]" >
        <h1 className="mb-4 text-2xl font-semibold">Register</h1>
        <form className="container w-[40rem]" onSubmit = {submitHandler}>
          <div className="my-[2rem]">
            <label htmlFor="name" className="block text-sm font-medium ">Name</label>
            <input type="text" name="" placeholder="Enter Username" id="name" className="w-full p-2 mt-1 border rounded" value={username} onChange={e=>setUserName(e.target.value)}/>
          </div>
          <div className="my-[2rem]">
            <label htmlFor="email" className="block text-sm font-medium ">Email</label>
            <input type="email" name="" placeholder="Enter Email" id="email" className="w-full p-2 mt-1 border rounded" value={email} onChange={e=>setEmail(e.target.value)}/>
          </div>
          <div className="my-[2rem]">
            <label htmlFor="password" className="block text-sm font-medium ">Password</label>
            <input type="password" name="" placeholder="Enter Password" id="password" className="w-full p-2 mt-1 border rounded" value={password} onChange={e=>setPassword(e.target.value)}/>
          </div> 
          <div className="my-[2rem]">
            <label htmlFor="confirm password" className="block text-sm font-medium ">Confirm Password</label>
            <input type="password" name="" placeholder="Enter Confirm Password" id="confirmPassword" className="w-full p-2 mt-1 border rounded" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
          </div>  
          <button disabled={isLoading} type="submit" className="  bg-pink-500 text-white py-2 px-4 rounded cursor-pointer my-[1rem]">
            {isLoading?"Registering...":"Register"}
          </button>
          {isLoading&& <Loader/>}
        </form>
        <div className="mt-4">
          <p className="">Already have an account? <Link className="text-pink-500 hover:underline" to={redirect?`/login?redirect=${redirect}`:'/login'}>Login</Link></p>
        </div>
     </div>
     
     <img
        src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
        alt=""
        className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
      />
    </section>
  )
}

export default Register