import React from 'react'

export default function Popup_addAnime({ visible, onClose }) {
    const click = (e) => { if (e.target.id === 'contaner') onClose() }
    if (!visible) return null;
    return (
        <div id='contaner' onClick={click} className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center'>
            <div className='flex dark:text-white gap-2 p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
                Popup_addAnime
            </div>
        </div>
    )
}
