import React,{useEffect} from 'react'
import Body from "../component/Body"
import Footter from "../component/Footter"
import Layout from "../component/Layout"
import Navbar from "../component/Navbar"
import E_anime from '../element/E_anime'
import { auth_user } from '../logic/axios'
import { useNavigate } from 'react-router-dom'

export default function Anime() {
    const token = localStorage.token_id
    const navigate =useNavigate()
    useEffect(()=>{
      auth_user(token)
      .then(res=>{
        if(res.data.status === 'ok'){console.log(res) }
        else{localStorage.clear();navigate('/login')}
      })
      .catch((error) => { console.error('Error', error) })
    },[])
    return (
        <Body>
            <Navbar />
            <Layout>
                <E_anime />
            </Layout>
            <Footter />
        </Body>
    )
}
