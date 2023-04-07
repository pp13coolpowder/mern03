import React from 'react'
import { useGetAnimeByIdQuery } from '../../stateManage/AnimeApi';
import { useSelector } from 'react-redux';

export default function Popup_anime({ visible, onClose }) {
  const id = useSelector((state) => state.animeID.value)
  const { data } = useGetAnimeByIdQuery(id)
  const click = (e) => { if (e.target.id === 'contaner') onClose() }
  if (!visible) return null;
  return (
    <div id='contaner' onClick={click} className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center'>
      <div className='max-h-96 w-sm overflow-x-hidden dark:text-white gap-2 p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
        {data.name}
        <br></br>
        {data.aka}
        <img class=" max-w-sm rounded-lg" src={data.image}/>
        <div className='max-w-sm '>{data.detail}</div>
      </div>
    </div>
  )
}
