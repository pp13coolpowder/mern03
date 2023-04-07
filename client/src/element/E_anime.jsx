import React, { useState } from 'react'
import { useGetAnimeByNameQuery } from '../stateManage/AnimeApi'
import { id_anime } from '../stateManage/anime_id'
import { useDispatch } from 'react-redux'
import Popup_anime from './popup/Popup_anime'

export default function E_anime() {
  const { data, error, isLoading } = useGetAnimeByNameQuery()
  const dispatch = useDispatch()
  const [popup, setpopup] = useState(false)
  const handclose = () => setpopup(false)
  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <div className='grid grid-cols-3 gap-2 dark:text-white'>
          {data.map((item, index) => (
            <div key={index} className='bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
              <diV onClick={() => { setpopup(true); dispatch(id_anime(item._id)) }} className='gap-2 p-4 flex items-center  justify-center'>
                <img className='w-10 h-10 rounded-full' src={item.image} />
                {item.name}
              </diV>
            </div>
          ))}
        </div>
      ) : null}
      <Popup_anime onClose={handclose} visible={popup} />
    </div>
  )
}
