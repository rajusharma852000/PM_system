import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const RestrictUsers = () => {
  const navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem('admin-token')){
          navigate('/adminLogin');
      }
    },[]);
  return (
    <div>
      
    </div>
  )
}

export default RestrictUsers
