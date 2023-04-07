import React, { useState, useEffect } from 'react'
import { todo_list, todo_delete,todo} from '../logic/axios'
import Popup_crud from './popup/Popup_crud';

export default function E_crud() {
   
    const [Data, setdata] = useState([])
    useEffect(() => { loadData() }, [])
    const loadData = () => {
        todo_list()
            .then(res => { setdata(res.data); })
            .catch(err => { console.log(err); })
    }
    
    const d ={todo: ''}
    const [submit, setsubmit] = useState(d)
    const handlechang = (e) => {setsubmit({[e.target.name]: e.target.value})}
    const handsubmit = (e)=>{
        e.preventDefault()
        todo(submit)
        setsubmit(d)
        loadData() 
    }
    const [popup,setpopup]=useState(false)
    const handclose = ()=> {setpopup(false),loadData()}
    const [iduser,setiduser]=useState()

    return (
        <div>
            <div className="relative">
                <div className="w-full mb-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={handsubmit}>
                        <input onChange={handlechang} value={submit.todo}  name='todo' className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="TODO CRUD" required />
                        <button type="submit" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Red to Yellow</button>
                    </form>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                        {Data.sort((a,b)=>a.todo>b.todo ? 1:-1).map((item, index) =>
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.todo}
                                </th>
                                <td className="px-6 py-4">
                                    <button onClick={()=> {setpopup(true);setiduser(item._id)}} type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Update</button>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => { todo_delete(item._id),loadData()}} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Popup_crud onClose={handclose} visible={popup} user={iduser}/>
        </div>
    )
}
