import React, { useEffect, useState } from 'react'
import "./details.css";
const Details = () => {
  const [user,setUser] =useState({})


  useEffect(()=>
  {
    fetch("http://localhost:8000/api/user/users")
    .then((res)=>res.json())
    .then((data)=>setUser(data))
    
    
  },[])
  return (
    <div className='details'>
     <div className="table">
     <table>
        <thead>
          <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          </tr>
        </thead>
        {
         Array.isArray(user)
          ? user.map((vl,id)=>
          {
            return (
              <tbody key={id}>
                <tr >
                  <td>{vl._id}</td>
                  <td>{vl.name}</td>
                  <td>{vl.email}</td>
                </tr>
              </tbody>
            );
          } )
          : null
      
        
        }
      </table>
     </div>

    </div>
  )
}

export default Details;