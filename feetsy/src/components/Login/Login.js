import React, { useState } from 'react';
import '../../App.css';
import { Row, Col,  Input, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import '../../css/custom.css';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { register } from '../../features/userSlice';
import { authenticateUser, login, logout } from '../../features/userSlice';
const Login = () =>{

    const [loginEnabled, setLoginEnabled] = useState(true)
    const [emailr, setEmailr]  = useState("")
    const [passwordr, setPasswordr] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const loguser = useSelector(authenticateUser)

    const navigateRegister = (e) =>{
        setLoginEnabled(false)
    }

    const emailrHandler = (e) =>{
        setEmailr(e.target.value)
    }

    const passwordrHandler = (e) =>{
        setPasswordr(e.target.value)
    }

    const nameHandler = (e) =>{
        setName(e.target.value)
    }

    const emailHandler = (e) =>{
        setEmail(e.target.value)
    }

    const passwordHandler = (e) =>{
        setPassword(e.target.value)
    }

    const registerUser = (e) =>
    {
        e.preventDefault();
        const data = {
            name : name,
            email : emailr,
            password : passwordr
        }
        dispatch(
            register({
              username : name,
              email: emailr,
              isLoggedIn: false
            })
          )
        //console.log(process.env.REACT_APP_SERVER)
        axios.post(process.env.REACT_APP_SERVER+'/register', data)
        .then(function (response){
            alert("User Registration Successful")
            setLoginEnabled(true)
        })
        .catch(function (err){
            alert("User Registration not successful."+err)
        })        
    }

    const loginUser = (e) =>
    {
        e.preventDefault();

        const data = {
            email : email,
            password : password
        }
        axios.post(process.env.REACT_APP_SERVER+'/login', data)
        .then(function (response){ 
            console.log(response["data"])
            dispatch(login({
            token: response["data"]["token"],
            userid: response["data"]["foundUser"]["_id"],
            username:response["data"]["foundUser"]["name"],
            email:response["data"]["foundUser"]["email"],
            isLoggedIn: true
              }))

            alert("LogIn Successful")
        })
        .catch(function (err){
            alert("Login not Successful. "+err)
            console.log(err)})
    }

    return(
        <div>
            {loginEnabled?
            <div>
                <Row>
                    <Col span={18}>
                        <h2>Sign In</h2>
                    </Col>
                    <Col span={6}>
                        <Button  type="primary" onClick={e=> navigateRegister(e)}>Register</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <p><b>Email address</b></p>
                    </Col>
                    <Col span={24}>
                        <Input onChange={(e) =>emailHandler(e)} className="email"/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <p><b>Password</b></p>
                    </Col>
                    <Col span={24}>
                        <Input.Password onChange={(e) =>passwordHandler(e)} className="password"/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Button type="primary" shape="round" className="signin" size='large' onClick={(e)=>loginUser(e)}>Sign in</Button>
                    </Col>
                </Row>
            </div>
            :
            
            <div>
                <h2><b>Create your profile</b></h2>
                <h4>Registration is easy</h4>
                <Row>
                    <Col span={24}>
                        <p><b>Email address</b></p>
                    </Col>
                    <Col span={24}>
                        <Input className="emailr" onChange={(e)=>emailrHandler(e)}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <p><b>Full Name</b></p>
                    </Col>
                    <Col span={24}>
                        <Input className="namer" onChange={(e) =>nameHandler(e)}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <p><b>Password</b></p>
                    </Col>
                    <Col span={24}>
                        <Input.Password className="passwordr" onChange={(e)=>passwordrHandler(e)}/>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col span={24}>
                        <Button type="primary" shape="round" className="register" size='large' onClick={(e)=>registerUser(e)}>Register</Button>
                    </Col>
                </Row>
            </div>}
        </div>
        )
    }

export default Login;