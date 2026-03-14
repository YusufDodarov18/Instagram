"use client"


import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from 'framer-motion';
import Instalations from "../components/instalation"
import { Footer } from "../components/footer"
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useTranslation } from "react-i18next"
import { useState } from "react";
import axios from "axios";
import { instagram } from "@/app/widget/icons/svg";

function page() {
  const [name, setName] = useState("")
  const [surName,setSurname]=useState("")
  const [email,setEmail]=useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading,setLoading]=useState(false)
  
  const router=useRouter()
  const {t}=useTranslation()


  let gmail = "@gmail.com";

  async function handleRegistration() {
    setRegistrationError("")

    if(!name&&!surName&&!password&&!confirmPassword&&!email){
      setRegistrationError(t("authentication.register.errorAll"));
      return
    }

    if(name.length<=3){
      setRegistrationError(t("authentication.register.registrationErrorShortName"));
      return;
    }

    if(surName.length<=5){
      setRegistrationError(t("authentication.register.registrationErrorShortSurname"));
      return;
    }

    if(password.length<=5||confirmPassword.length<=5){
      setRegistrationError(t("authentication.register.registrationErrorShortPassword"));
      return
    }

    if (password != confirmPassword){
      setRegistrationError(t("authentication.register.registrationErrorPasswordMismatch"));
      return;
    }

    if(!email.endsWith(gmail) && email.length<=11){
      setRegistrationError(t("authentication.register.registrationErrorEmail"));
      return
    }

    try {
      setLoading(true)

      const user={
        userName:name,
        fullName:surName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }
      const {data}=await axios.post(`https://instagram-api.softclub.tj/Account/register`,user)
      
      if(data){
          router.push("/login")
      }

      setLoading(false)
    } catch (err) {
      setRegistrationError(t("authentication.register.registrationErrorGeneric"));
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen px-10 pt-2 sm:px-0">
        <div className="flex flex-col gap-5 mt-2">
         <div className="w-full max-w-[370px] sm:w-[370px] border border-solid border-[#cacaca] mx-auto pb-2 px-4 sm:px-0">
              <span>{instagram}</span>
                <p className="text-[16px] font-bold text-[gray] text-center mt-[10px] w-[280px] m-auto">{t("authentication.register.headerInfo")}</p>
                <div className="flex justify-center items-center ">
                  <Link href={"https://www.facebook.com"}>
                      <button className="bg-blue-500 text-[white] cursor-pointer w-50 h-10 md:w-[280px] md:h-[38px] rounded-[5px] font-bold text-[16px] mt-[20px] ">{t("authentication.register.facebookLogin")}</button>
                  </Link>
                </div>
                <p className="text-gray-500 text-center mt-[23px] text-[18px]">{t("authentication.register.or")}</p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className=" flex flex-col justify-center items-center  gap-[15px]"
                  >
                    <motion.input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="p-[10px_15px] mt-[25px] w-[280px] h-[42px] dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 rounded-[6px] bg-white dark:bg-[#262626] text-[16px] focus:outline-none focus:border-[#0095F6] focus:ring-1 focus:ring-[#0095F6] transition"
                      placeholder={t("authentication.register.email")}
                      type="email"
                    />
                    <div className="relative w-[280px]">
                      <motion.input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-[10px_15px] w-[280px] h-[42px] dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 rounded-[6px] bg-white dark:bg-[#262626] text-[16px] focus:outline-none focus:border-[#0095F6] focus:ring-1 focus:ring-[#0095F6] transition"
                        placeholder={t("authentication.login.password")}
                        type={showPassword?"text":"password"}
                      />
                     {password&&(
                      <span
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </span>
                    )}
                    </div>
                    <div className="relative w-[280px]">
                       <motion.input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-[10px_15px] w-[280px] h-[42px] dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 rounded-[6px] bg-white dark:bg-[#262626] text-[16px] focus:outline-none focus:border-[#0095F6] focus:ring-1 focus:ring-[#0095F6] transition"
                        placeholder={t("authentication.register.confirmPassword")}
                        type={showConfirmPassword?"text":"password"}
                      />
                     {confirmPassword&&(
                      <span
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </span>
                    )}
                    </div>
                    <motion.input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="p-[10px_15px] w-[280px] h-[42px] dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 rounded-[6px] bg-white dark:bg-[#262626] text-[16px] focus:outline-none focus:border-[#0095F6] focus:ring-1 focus:ring-[#0095F6] transition"
                      placeholder={t("authentication.register.firstName")}
                      type="text"
                    />
                    <motion.input
                      value={surName}
                      onChange={(e) => setSurname(e.target.value)}
                      className="p-[10px_15px] w-[280px] h-[42px] dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 rounded-[6px] bg-white dark:bg-[#262626] text-[16px] focus:outline-none focus:border-[#0095F6] focus:ring-1 focus:ring-[#0095F6] transition"
                      placeholder={t("authentication.register.lastName")}
                      type="text"
                    />
                  </motion.div>
                   <br />
                {registrationError && (
                  <p className="text-red-500 text-center mb-3">{registrationError}</p>
                )}
               <div className="flex flex-col items-center gap-2 text-center text-[12px] w-[280px] m-auto">
                    <p>
                      {t("authentication.register.contactInfoNotice")}
                      <Link href="https://www.facebook.com/help/instagram/261704639352628">
                        <span className="text-blue-800 dark:text-blue-500"> {t("authentication.register.contactInfoMore")}</span>
                      </Link>
                    </p>
                    <p>{t("authentication.register.registrationInfo")}</p>
              </div>
              
                <div className="flex justify-center py-4">
                    <motion.button
                        className={`bg-blue-400 mt-[10px] flex justify-center items-center cursor-pointer text-[white] w-[280px] h-[35px] rounded-[5px] font-bold text-[16px] 
                        ${loading ? "opacity-50 cursor-not-allowed" : ""} `}
                          disabled={loading}
                          onClick={handleRegistration}
                        >
                          {loading ? (
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.8,
                                ease: "linear",
                              }}
                            />
                          ) : (
                            <>{t("authentication.register.registerButton")}</>
                          )}
                    </motion.button>
                </div>
          </div>
            <div className="w-[370px] h-[52px] border border-solid mt-[-10px]">
                <p className="text-[15px] text-[gray] ml-[120px] mt-[15px] m-[auto] ">
                  {t("authentication.register.alreadyHaveAccount")}
                  <Link href={"/login"}>
                    <span className="font-semibold text-blue-600 dark:text-blue-500"> {t("authentication.register.loginLink")}</span>
                  </Link>
                </p>
            </div>
              <Instalations/>
        </div>
      </div>
                        
        <div className="mt-[40px]">
            <Footer/>
        </div>
    </>
  )
}

export default page