import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/Constants';
import { cacheResults } from '../utils/SearchSlice';

const Head = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector(store => store.search);

  useEffect(() => {
   const timer = setTimeout(() => {
    if(searchCache[searchQuery]){
      setSuggestions(searchCache[searchQuery]);
    } else {
      getSearchSuggestions()
    }
    }, 200);
   return () => {
    clearTimeout(timer);
   };
  },[searchQuery]);

  const getSearchSuggestions = async () =>{
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(json[1]);
    setSuggestions(json[1]);
    
    //update cache
    dispatch(cacheResults({
      [searchQuery]: json[1],
    }));
  }

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
     dispatch(toggleMenu())
  }

  return (
    <div className='grid grid-flow-col p-5 m-5 shadow-lg'>
        <div className='flex col-span-1'>
            <img 
            onClick={() => toggleMenuHandler()}
            className='h-8 cursor-pointer'
            alt="menu" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"
             />
            <a href="/">
            <img className='h-8 mx-2'
            alt= "youtube-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
             />
           </a>
        </div>
        <div className='col-span-10 px-10'>
            <div>
            <input 
            className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full" 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            />
            <button className='border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100'>
              🔍
            </button>
            </div>
            {showSuggestions && (
               <div className='absolute mt-2 overflow-hidden bg-white py-2 px-2 w-[36rem] shadow-lg rounded-lg border border-gray-100 '>
              <ul>
                {suggestions?.map((s) => (
                  <li key={s} className='py-2 px-3 shadow-sm hover:bg-gray-100'>
                  🔍 {s}
                  </li>
                ))}
              </ul>
            </div>
              )}
        </div>
    
        <div className='col-span-1'>
            <img className='h-8'
            alt="user"
            src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
            />
        </div>
    </div>
   
  )
}

export default Head
