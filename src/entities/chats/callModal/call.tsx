import { API } from '@/shared/utils/config';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import profile from '../../../app/(router)/(protected)/profile/profil-removebg-preview.png'
import { useTranslation } from 'react-i18next';
import callPhoto from "./callImage.png"
import { X } from 'lucide-react';
import { useProfileById } from '@/app/store/pages/profile/profile-by-id/profile-by-id';
import { usePathname } from 'next/navigation';

const Call = ( {open,onClose, user} :{open:boolean, onClose:()=>void,user:string}) => {

    if(!user) return
    // console.log(user)

    const {getInfoById, info}=useProfileById()
    const [microphone,setMicrophone]=useState(false)
    const [calling,setCalling]=useState(false)
    const [stream,setStream]=useState<MediaStream |null>(null)
    const [muted,setMuted]=useState(false)
    const localVideo=useRef<HTMLVideoElement | null>(null)
    const remoteVideo = useRef<null|HTMLVideoElement >(null)
    const peerRef = useRef<RTCPeerConnection | null>(null)
    const pathName=usePathname()
    const {t}=useTranslation()

    useEffect(()=> { 
        getInfoById(user)
    },[ user ])

    const startCall = async()=>{
        setCalling(true)

        const media=await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true
        })

        setStream(media)

        if(localVideo.current){
            localVideo.current.srcObject=media
        }

        const peer= new RTCPeerConnection()

        media.getTracks().forEach(track =>
        {
            peer.addTrack(track, media)
        })

        peer.ontrack=(e)=> {
             if(remoteVideo.current){
                 remoteVideo.current.srcObject=e.streams[0]
             }
        }
        peerRef.current=peer
    }

    const toggleMute=()=>{
        if(!stream) return null
        const audioTrack=stream.getAudioTracks()[0]
        audioTrack.enabled=!audioTrack.enabled
        setMuted(!audioTrack.enabled)
    }


    const endCall= ()=> {
        if(peerRef.current){
            peerRef.current.close()
        }
        if(stream){
            stream.getTracks().forEach(
                track=> track.stop()
            )
        }

        setCalling(false)
        setStream(null)
    }

  return (
    <Fragment>
        {
         !microphone?
            <div className="w-[100%] h-[100%] fixed bg-[#000] inset-0 z-[1000]">
                    <div className="flex justify-end w-[100%] pr-3 pt-2">
                        <X onClick={onClose} className='cursor-pointer text-white'/>
                     </div>
                    <div className="flex justify-center items-center flex-wrap gap-5 h-[calc(100%-50px)]">
                        <div className="bg-[#282727] w-[450px] h-[370px] flex justify-center items-center rounded-2xl">
                            <div className="flex flex-col justify-center items-center text-center gap-2">
                                <img src={callPhoto.src} className="w-[350px] h-[150px]" alt="call" />
                                <h2 className="font-bold text-lg text-[white]">{t("You have blocked access to the microphone.")}</h2>
                                <p className='text-xs text-[#8A8D91]'>{t("To grant access, click the lock icon in the address bar. Select 'Allow' for 'Microphone'. Then reload the page to apply the new settings.")}</p>
                                <a href={"/chats/"+pathName.split("/")[2]} className="text-[#19A3FF] hover:underline">{t("Refresh the page")}</a>
                            </div>
                        </div>
                        <div className="bg-[#282727] flex justify-center items-center w-[320px] h-[370px] rounded-2xl">
                            <div className="flex flex-col justify-center text-center items-center gap-4">
                                <div>
                                    <img src={
                                            info?.image?
                                                `${API}/images/${info.image}`:
                                            profile.src
                                        } 
                                        alt="profile"
                                        className="w-[80px] h-[80px] rounded-[50%] object-cover"
                                    />
                                </div>
                                <div>
                                    <h1 className="font-bold text-xl text-[white]">{info?.userName}</h1>
                                    <p className="text-[white]">{t("Make a call?")}</p>
                                </div>
                                <div>
                                    <button onClick={()=>setMicrophone(true)} className="bg-[#429AFF] px-3 py-1 rounded-3xl text-[white] hover:bg-[#5ca6fa] cursor-pointer">{t("Call")}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>:
                    <div className="w-[100%] h-[100%] fixed pt-3 px-3 bg-[#000] inset-0 z-[1000]">
                        <div className="bg-[#333333] text-white rounded-4xl p-4 rounded-tl-xs max-w-sm shadow-lg cursor-pointer">
                          <p className="font-semibold text-[white]">{t("call_required")}</p>
                          <p className="text-gray-400 mt-1">{t("allow_microphone")}</p>
                        </div>
                        <div className="h-[100%] flex justify-center flex-wrap gap-3 items-center flex-col">
                             <svg viewBox="0 0 36 36" fill="currentColor" width="50" height="50" className="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq" style={{color:"#484848"}}>
                                <path d="M18 6.998c1.28 0 2.418.6 3.15 1.535.27.344.188.826-.121 1.135l-5.826 5.825a.695.695 0 0 1-1.202-.496L14 13.998v-3a4 4 0 0 1 4-4zM12 16.498c0 .5.061.985.176 1.45a.811.811 0 0 1-.199.771l-.846.847c-.362.361-.971.261-1.143-.221a8.486 8.486 0 0 1-.488-2.847v-.5a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v.5zM13.627 20.606l-1.769 1.768-4.492 4.493a1.25 1.25 0 1 0 1.768 1.768l4.181-4.181c.317-.317.803-.379 1.212-.196a8.44 8.44 0 0 0 1.798.575.522.522 0 0 1 .425.506v.659a.5.5 0 0 1-.5.5H13.5a1 1 0 0 0-1 1v.5a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-.5a1 1 0 0 0-1-1h-2.75a.5.5 0 0 1-.5-.5v-.66c0-.248.182-.456.425-.505a8.503 8.503 0 0 0 6.825-8.335v-.5a1 1 0 0 0-1-1H25a1 1 0 0 0-1 1v.5a6 6 0 0 1-7.57 5.792c-.345-.093-.432-.519-.18-.771l.712-.712c.23-.23.555-.325.878-.312A4 4 0 0 0 22 16.498c0-.467.186-.915.516-1.245l6.119-6.12a1.25 1.25 0 1 0-1.768-1.767L22 12.233l-6.958 6.957-1.415 1.416z"></path>
                             </svg>
                             <h1 className="font-bold text-2xl text-white">{t("microphone_denied")}</h1>
                             <p className="text-white">{t("enable_microphone_instagram")}</p>
                        </div>
                    </div>
                }
                {/* 
                    <div className="w-full h-screen bg-[#0f0f0f] flex flex-col items-center justify-center text-white">
                         <div className="relative w-[700px] h-[400px] bg-black rounded-2xl overflow-hidden shadow-2xl">
                             <video ref={remoteVideo}
                               autoPlay
                               playsInline
                               className="w-full h-full object-cover"
                             />
                            <video ref={localVideo} autoPlay playsInline
                               muted
                               className="absolute bottom-4 right-4 w-[160px] h-[100px] object-cover rounded-xl border border-gray-600"
                             />
                        </div>
                        <div className="flex items-center gap-6 mt-6">
                           <button onClick={startCall} className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl transition">Start Call</button>
                           <button onClick={toggleMute} className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-xl transition">{muted ? "Unmute" : "Mute"}</button>
                           <button onClick={endCall} className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl transition">End Call</button>
                        </div>
                    </div>       
                */}
    </Fragment>
  );
}

export default Call;
