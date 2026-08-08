import { Children, createContext ,useContext ,useEffect  , useState } from "react";

import authService from "../services/authService";

const AuthContext = createContext(null)

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const initializeAuth = async ()=>{
            const token = localStorage.getItem("water_tracker_token")
        

        if(!token){
            setLoading(false)
            return
        }

        try{
            const response = await authService.getMe()

            setUser(response.data.user)
        }
        catch(error){
            localStorage.removeItem("water_tracker_token")
            setUser(null)
        }
        finally{
            setLoading(false)
        }
    }
    initializeAuth()
    },[])

    const login = async (credentials)=>{
        const response = await authService.login(credentials)

        const {user , token} = response.data

        localStorage.setItem("water_tracker_token",token)
        setUser(user)

        return response
    }

    const register = async (userData)=>{
        const response = await authService.register(userData)

        const {user , token} = response.data

        localStorage.setItem("water_tracker_token", token);

    setUser(user);

    return response;
    }

    const logout = ()=>{
        localStorage.removeItem("water_tracker_token")
        setUser(null)
    }

    const value ={
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: Boolean(user),
        isAdmin:user?.role==="admin",
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const context = useContext(AuthContext)

    if(!context){
        throw new Error(
            "useAuth must be used inside AuthProvider"
        )
    }

    return context
}