import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { closeMenu } from '../utils/appSlice';

const WatchPage = () => {

    const [searchParam] = useSearchParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(closeMenu())
    })

  return (
    <div className='px-5'>
      <iframe width="1200" height="600" src={"https://www.youtube.com/embed/" + searchParam.get("v")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  )
}

export default WatchPage;