"use client"
import { useUser } from '@/app/store/pages/home/users/users';
import { API } from '@/shared/utils/config';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import profile from '../../../profile/profil-removebg-preview.png'
import Link from 'next/link';

const page = () => {
  const {users, getUsers}=useUser()
  const [selectedUser,setSelectedUser]=useState<string|null>(null)
  const router=useRouter()
  const {t}=useTranslation()

  useEffect(()=>{
    getUsers()
  },[getUsers])

  const handleSelected=(id:string)=>{
    if(id===selectedUser){
      setSelectedUser(null)
    }else{
      setSelectedUser(id)
    }
  }
  return (
    <>
      <div className="py-[42px] px-[8px] w-[90%] flex flex-col gap-8">
        <div className="flex gap-2 items-center">
          <svg aria-label="Назад" className="rotate-[-90deg] cursor-pointer" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" onClick={() => router.back()}>
            <title>Назад</title>
            <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
          </svg>
          <h1 className="text-2xl font-black">{t("setting.Close friends")}</h1>
        </div>
        <p className="text-gray-500">
          {t("setting.No one will be notified that you have changed your Close Friends list.")}
          <span className="text-blue-500 cursor-pointer"> {t("setting.How it works.")}</span>
        </p>
      </div>

      <div className="flex flex-col gap-4 pb-6">
        <div className="relative w-[90%] h-[40px] rounded-[10px] ml-1 flex gap-2 items-center px-4 bg-[#d8dde4] dark:bg-[#3b3b3b]">
          <Search />
          <input type="text" placeholder="Поиск" className="outline-0" />
        </div>
        <div className="flex flex-col gap-3 w-[90%]">
          {users.slice(0,10).map((user,index)=>(
            <div className="flex justify-between" key={index}>
              <div className="flex gap-3.5 items-center px-2">
                <Link className="" href={`/profile/${user.id}`}>
                  <img src={user.avatar?`${API}/images/${user.avatar}`:profile.src} className="w-[50px] h-[50px] rounded-[100%]"/>
                </Link>
               <div className="">
                  <Link href={`/profile/${user.id}`}>{user.userName}</Link>
                  <p className="text-gray-500">{user.fullName}</p>
               </div>
            </div>
            <div>
              {selectedUser===user.id?(
                <div className="flex-shrink-0 h-6 w-6 bg-[rgb(74,93,249)] [mask-image:url('https://i.instagram.com/static/images/bloks/icons/generated/circle-check__filled__24-4x.png')] [mask-size:contain]" onClick={()=>handleSelected(user.id)} data-bloks-name="ig.components.Icon"></div>
              ):(
                <div className="flex-shrink-0 h-6 w-6 bg-[rgb(219,219,219)] [mask-image:url('https://i.instagram.com/static/images/bloks/icons/generated/circle__outline__24-4x.png')] [mask-size:contain]" onClick={()=>handleSelected(user.id)}  data-bloks-name="ig.components.Icon"></div>
              )}
            </div>
          </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default page;
