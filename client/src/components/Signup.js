import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import "./signup.css";
const Signup = () => {

  const [user,setUser] = useState({
    name:"",
    email:"",
    password:""

  })

  const onChangeHandler = (e)=>
  {
  let name,value;
  name = e.target.name;
  value=e.target.value;

  setUser({...user,[name]:value});

}


  const sendData=(e)=>
  {
    const {name,email,password}=user;
    e.preventDefault();
    fetch("http://localhost:8000/api/user/register",
    {
      method:"POST",
      headers:{
        'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name,
        email,
        password
      })

    }).then(()=>
    {
      window.alert(`\n\nRegistration Successfully`);
    })


    setUser({
      name:"",
      email:"",
      password:""
    })

  }
  return (
    <div className='sig_nup'>
      <form onSubmit={sendData}>
        <div className="input_div">
          <label htmlFor="name">
            Name: <input className='input_field' type="text"
            placeholder='Your Name'
            name='name'
            required
            value={user.name}
            onChange={onChangeHandler}
            />
          </label>
        </div>
        <div className="input_div">
          <label htmlFor="email">
            Email: <input className='input_field' type="email"
            placeholder='Your Email'
            name='email'
            required
            value={user.email}
            onChange={onChangeHandler}
            />
          </label>
        </div>
        <div className="input_div">
          <label htmlFor="password">
            Password: <input className='input_field' type="password"
            placeholder='Your Password'
            name='password'
            required
            value={user.password}
            onChange={onChangeHandler}
            />
          </label>
        </div>
        <button className='signup_btn' type='submit'>Register</button>
        <span className='login'><NavLink className="login_btn" to="/login">Login ?</NavLink></span>
      </form>

    </div>
  )
}

export default Signup;