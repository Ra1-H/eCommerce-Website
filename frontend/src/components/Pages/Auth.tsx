import {Routes,Route} from "react-router-dom";
import Register from "../Forms/Register";
import Login from "../Forms/Login";


function Auth(){

    // const navigate=useNavigate()
    // const{token}=useCommerceStore()


  // useEffect(()=>{
  //   if(token){
  //     return navigate("/home")
  //   }
  //    // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])


return(
    <div className="flex items-center h-full">
        <div className="w-[40%] h-full flex justify-center items-center">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <div className="w-[60%] h-full">
            <img src="/shoppingCart.png" alt="auth img wrapper"/>
        </div>
    </div>
)
}

export default Auth;