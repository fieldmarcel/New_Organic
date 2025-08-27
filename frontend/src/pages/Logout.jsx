
import React from 'react'
import useNavigate from 'react-router-dom'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
const Logout = () => {
const navigate= useNavigate();
  const handleLogout = async (e) => {

    e.preventDefault()

    try {
      
   const logout=    await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/v1/users/logout",
        {},
        {
          withCredentials: true,
        })

res.status(200).send({success:true,message:"Logged out successfully"})

const data= await logout.data;
if(data.success){
  toast.success(data.message);
  dispatch(logout(true));
           dispatch(setUser(data.user)) ;
  navigate("/login")
}

    } catch (error) {
      
    }
    
    }







  return (
    <div>




    </div>
  )
}

export default Logout;
