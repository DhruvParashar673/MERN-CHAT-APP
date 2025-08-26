import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import axios from "axios";
import toast from "react-hot-toast";



export const useAuthStore =create((set)=>({

    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,

    checkAuth:async()=>{
        try{
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data})


        }catch(error){
              console.log("Error in checkAuth:",error);
              set({authUser:null});
        }
        finally{
            set ({isCheckingAuth:false});
        }
    },

    signup:async  (data)=>{
        set({isSigningUp:true});
    try {
        const res=await axiosInstance.post("/auth/signup",data);
        toast.success("Account created successfully");
        set({authUser:res.data})
       // set({isSigningUp:false});
    } catch (error) {
        toast.error(error.response?.data?.message || "Signup failed");
    }
    finally{
        set ({isSigningUp:false});
    }
    },

    logout :async ()=>{
        try {
            const res=await axiosInstance.post("/auth/logout");
            toast.success("Logged out successfully");
            set({authUser:null});
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },

    login:async(data)=>{
        set ({isLoggingIn:true});

        try {
           const res=await axiosInstance.post("/auth/login",data);
            toast.success("Logged in successfully");
            set({authUser:res.data}); 
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({isLoggingIn:false});
        }
    },

    updateProfile:async(data)=>{
        set({isUpdatingProfile:true});
        try {
            const res=await axiosInstance.put("/auth/update-profile",data);
            toast.success("Profile updated successfully");
            set({authUser:res.data});
        } catch (error) {
            toast.error(error.response?.data?.message || "Profile update failed");
        } finally {
            set({isUpdatingProfile:false});
        }
    }


}))