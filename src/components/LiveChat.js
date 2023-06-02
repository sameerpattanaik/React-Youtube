import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/ChatSlice';
import { generateRandomName, makeRandomMessage } from '../utils/helper';
import ChatMessage from './ChatMessage';

const LiveChat = () => {

    const [liveMessage, setLiveMessage] = useState("");

    const dispatch = useDispatch();

    const chatMessages = useSelector(store => store.chat.messages);

    useEffect(() => {
        const i = setInterval(() => {
            //API Polling
            console.log("Api Polling");
            dispatch(addMessage({
                name: generateRandomName(),
                message: makeRandomMessage(20) + " 🚀"
            }))
        }, 1500);
    
        return () => clearInterval(i);
    }, []);

  return (
    <>
    <div className='w-full h-[590px] m-2 p2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse'>
      <div>{
     
                chatMessages.map((c, i) => (
                <ChatMessage 
                    key={i}
                    name={c.name}
                    message={c.message}
                />
                ))
              }
       </div>
    </div>
    
    <form className='w-full p-2 ml-2 border border-black' onSubmit={(e) => {
      e.preventDefault();
      console.log("on form submit", liveMessage)
      dispatch(addMessage({
        name:'Sameer',
        message: liveMessage,
      }))
      setLiveMessage("");
    }}>
      <input className='px-2 w-96' type="text" value={liveMessage} onChange={(e) => {
        setLiveMessage(e.target.value);
      }}/>
      <button className='px-2 mx-2 bg-green-100'>Send</button>
    </form>
    
    
    </>
  )
}

export default LiveChat
