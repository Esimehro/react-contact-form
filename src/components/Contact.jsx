import {React, useState} from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    FormHelperText,
    Alert,
    AlertIcon,
    // FormErrorMessage, 
} from '@chakra-ui/react'


export const Contact = () => {

    const[value, setValue]= useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    })
    const[errors, setErrors]= useState({})
    const [error, setNewError]= useState(false)
    const [submit, setSubmit] = useState(false)
    const [clear, setClear] = useState([])


    const handleChange = (e)=>{
        const newValue = {...value,[e.target.name]:e.target.value}
        setValue(newValue)
        console.log(newValue)
    }

    const handleSubmit =(e)=>{    
        e.preventDefault()

        const validateForm = (value)=>{
            const errors ={}
            const emailErrorTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (!value.email){
                errors.email ='This email is not valid'
            } else if (!emailErrorTest.test(value.email)){
                errors.email = 'Please write a valid email address'
            }
        
            if (!value.firstName){
                errors.firstName ='This firstname is not valid'
            }
        
            if (!value.lastName){
                errors.lastName ='This lastname is not valid'
            }
        
            if (!value.message){
                errors.message ='Please write a message'
            }
            return errors;
        }
        
        const er = validateForm(value)
        setErrors(er)
        if(Object.keys(er).length > 0){
            setNewError(true)
            return;
        }
        const newData = {
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            subject: value.subject,
            message: value.message,
            id: nanoid()
        }

        axios.post('https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries', newData)
        .then((response)=>{
            console.log(response.data)
            setNewError(false)
            setErrors(false)
            setSubmit(true)
            setClear([...clear, value])
            setValue({
                firstName: '',
                lastName: '',
                email: '',
                subject: '',
                message: ''
            })
        })
        .catch((error)=>{
            console.log(error)
            setNewError(true)
            setSubmit(false)
        })
    }

    

    

  return (
    <div className='wrapper'>
        <div className='container'>
            <div className='welcome'>
               <h1 className='header'>Contact us</h1>
               <p className='welcome-paragraph'>Let's get this conversation started</p>
            </div>
            <form onSubmit={handleSubmit}>
               {submit && (
               <Alert status='success' marginBottom={'30px'} color={'green'}>
                 {/* <AlertIcon /> */}
                 Your form has been submitted successfully
                </Alert>
               )}
               {error && (
               <Alert status='error' marginBottom={'30px'} color={'red'}>
                  {/* <AlertIcon /> */}
                 There was an error processing your request
                </Alert>
               )}
                <div className='name-field'>
                    <FormControl className='name-section'>
                       <FormLabel className='label'>Firstname</FormLabel>
                       <Input className='input-field' type='text' name='firstName' onChange={handleChange}  value={value.firstName}/>
                       {errors.firstName && <FormHelperText color={'red'}>{errors.firstName}</FormHelperText>}
                    </FormControl>

                    <FormControl>
                       <FormLabel className='label'>Lastname</FormLabel>
                       <Input className='input-field' type='text'  name='lastName' onChange={handleChange} value={value.lastName}/>
                       {errors.lastName && <FormHelperText  color={'red'}>{errors.lastName}</FormHelperText>}
                    </FormControl>
                </div>

                <FormControl className='section'>
                   <FormLabel className='label'>Email</FormLabel>
                   <Input className='section-input' type='email'  name='email' onChange={handleChange} value={value.email}/>
                   {errors.email && <FormHelperText  color={'red'}>{errors.email}</FormHelperText>}
                </FormControl>

                <FormControl className='section'>
                   <FormLabel className='label'>Subject</FormLabel>
                   <Input className='section-input' type='text'  name='subject' onChange={handleChange} value={value.subject}/>
                </FormControl>

                <FormControl className='section'>
                    <FormLabel className='label'>Message</FormLabel>
                    <Textarea className='message' rows="6" cols="59" type='text'  name='message' onChange={handleChange} value={value.message}/>
                    {errors.message && <FormHelperText  color={'red'}>{errors.message}</FormHelperText>}
                </FormControl>

                <Button className='btn' type='submit'>Submit</Button>
            </form>
        </div>
    </div>
  )
}
