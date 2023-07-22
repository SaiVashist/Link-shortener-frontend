import React, { useState } from 'react';
import axios from 'axios';
import './HomeStyle.css'
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  Originalurl: Yup.string().required('Please provide a URL'),
});
const Home = () => {
  // const [Originalurl, setURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const[isLoading , setIsLoading] = useState(false)
  const[errorMessage , setErrorMessage] = useState('')

  const formik = useFormik({
    initialValues : {
      Originalurl: ''
    },
    validationSchema,
    onSubmit:(values , {resetForm}) => {

      console.log(values)
      shortenApi(values)
      resetForm();

    }
  })


  const shortenApi = async (values) => {
    setIsLoading(true)
    const params = {
      url: values.Originalurl,
    };
    try {
      const response = await axios.get("http://localhost:8080/getNewUrl",{params},{
      })

      if(response.status ===200){
       
        setShortURL(response.data);
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      setErrorMessage(error?.response?.data?.message ||  "Something went wrong")
      console.log(error?.response?.data?.message || "Something went wrong")
    
   
      
    }
  }



  

  return (
    <div className="header">
    {isLoading && <CircularProgress sx = {{position:"relative" , marginLeft:"auto",marginRight:"auto",marginTop:"5px"}}/>}
  <h2>URL Shortener</h2>
  <form onSubmit={formik.handleSubmit}>
    <div className='input-container'>
    <input
      type="text"
      id="Originalurl"
      placeholder="Enter URL"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.Originalurl}
    
    />

{formik.touched.Originalurl && formik.errors.Originalurl ? (
            <div className="error">{formik.errors.Originalurl}</div>
          ) : null}
  
    <button type="submit">Generate Short URL</button>
    </div>
  </form>
  <div className='short_Link'>
   <h3>{shortURL ? 'Your Short Link' :errorMessage }</h3>
  <a href={shortURL}>{shortURL}</a>
  </div>
</div>

  );
};

export default Home;
