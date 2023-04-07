import React,{useEffect} from 'react'
import Body from '../component/Body'
import Layout from '../component/Layout'
import E_register from '../element/E_register'
import { useNavigate } from 'react-router-dom'
import { auth_user } from '../logic/axios'

export default function Register() {
  const token = localStorage.token_id
  const navigate =useNavigate()
  useEffect(()=>{
    auth_user(token)
    .then(res=>{
      if (res.data.status === 'ok') { navigate('/') }
    })
    .catch((error) => { console.error('Error', error) })
  },[])
  return (
    <Body>
      <Layout>
        <E_register/>
      </Layout>
    </Body>
  )
}
