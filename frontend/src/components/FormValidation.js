import React, { useState } from 'react'

export default function FormValidation() {
    const [formData,setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });


    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value}) 
    }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     if(formData.email.length==0) {
    //         console.log("Please Enter a valid username");
            
    //     }

    // }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Form data submitted:', formData);
      }



  return (
    <>
    <form>
        <label htmlFor='username'>Username: </label>
        <input id="username" type='text' name='username'onChange={handleChange}/>
        <br/>

        <label htmlFor='email'>Email: </label>
        <input id="email" type='email' name='email' onChange={handleChange}/>
        <br/>

        <label htmlFor='password'>Password:</label>
        <input id="password" type='password' name='password' onChange={handleChange}/>
        <br/>

        <button type='submit' onSubmit={handleSubmit}>Sumit</button>
        {/* <p>Email:-----{formData.email}</p> */}
    </form>
    </>
  )
}


//username
//email
//password

