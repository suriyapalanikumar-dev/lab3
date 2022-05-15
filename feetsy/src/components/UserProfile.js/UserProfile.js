import React, {Component, useEffect, useState} from 'react';
import {Row, Col, Card, Input, Button, Modal, Select} from 'antd';
import 'antd/dist/antd.css';
import axios,{post} from 'axios';
import {
    ShopOutlined, EditOutlined, FileAddOutlined, BorderBottomOutlined
  } from '@ant-design/icons';
import noimage from "../../images/noimage.png";
import { useDispatch,useSelector } from 'react-redux';
import { authenticateUser, login, logout, shopSelect } from '../../features/userSlice';
import Navbar from '../Navbar/Navbar';


const {Meta} = Card;
const {Option} = Select;
const {TextArea} = Input;

const UserProfile = () =>{
    const dispatch = useDispatch();
    const loguser = useSelector(authenticateUser)
    const [filestore, setStoreFile] = useState(null)
    const [profiledp, setprofiledp] = useState(noimage)
    const [dob, setdob] = useState(null)
    const [address, setAddress] = useState(null)
    const [state, setState] = useState(null)
    const [country, setCountry] = useState("United States")
    const [city, setCity] = useState(null)
    const [zip, setZip] = useState(null)
    const [phone, setPhone] = useState(null)
    
    const changeFile = (e) =>{
        let data = e.target.files[0]
        setStoreFile(e.target.files[0])
    }

    const fileUpload = (file) =>{
        const url = process.env.REACT_APP_SERVER+'/uploadprofiledp';
        const formData = new FormData();
        formData.append('profile-file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
    }

    const dobHandler = (e) =>{
        setdob(e.target.value)
    }

    const addressHandler = (e) =>{
        setAddress(e.target.value)
    }

    const cityHandler = (e) =>{
        setCity(e.target.value)
    }
    const stateHandler = (e) =>{
        setState(e.target.value)
    }
    // const countryHandler = (e) =>{
    //     setCountry(e.target.value)
    // }
    const zipHandler = (e) =>{
        setZip(e.target.value)
    }
    const phoneHandler = (e) =>{
        setPhone(e.target.value)
    }
    
    // const handleddChange = (value)=>{
    //     console.log("hai")
    //     console.log(value)
    //     setCountry(value)
    // }

    function handleddChange(value) {
        setCountry(value)
      }
    const uploadImage = (e) =>{
        e.preventDefault()
        fileUpload(filestore).then((response)=>{
            let temp = response.data
            console.log(temp)
            axios.post(process.env.REACT_APP_SERVER+'/updateprofileimgdb', {'imgname':response.data["data"]["Key"]}, { headers: {"Authorization" : `Bearer ${loguser.token}`} })
            .then(response=>{
                console.log(process.env.REACT_APP_SERVER+"/image/"+temp["data"]["Key"])
                setprofiledp(process.env.REACT_APP_SERVER+"/image/"+temp["data"]["Key"])
            })
        })
    }

    const saveDetails=()=>{
        let data = {
            "dob":dob,
            "address":address,
            "state":state,
            "city":city,
            "zip":zip,
            "country":country,
            "phone":phone
        }
        axios.post(process.env.REACT_APP_SERVER+'/updateProfile', data, { headers: {"Authorization" : `Bearer ${loguser.token}`} })
        .then(response=>{
           alert("Profile details updated")
        })

    }
    
    return (
        <div>
        <Navbar/>
        <div style={{marginLeft:"7%",marginRight:"7%", borderStyle:"solid",borderColor:"black"}}>
            <h2><b>Your Profile Details</b></h2>
            <div style={{padding:"2%", boarderColor:"black"}}>
            <div style={{marginLeft:"45%"}}>
            <Card
            hoverable
            style={{ width: 150}}
            cover={<img alt="example" src={profiledp} /> }>
            </Card>
            </div>           
            <label><b>Profile Picture</b></label>
            <form onSubmit={(e) => uploadImage(e)}>
        {/*<form onSubmit={(e) => uploadImage(e)}>*/}
        <div>
            <label>Upload profile picture</label>
            <input type="file" name="profile-file" onChange={(e)=>changeFile(e)} required/>
        </div>
        <div>
            <input type="submit" value="Upload" />
        </div>
        </form>
            <br/>
            <label><b>Name:</b></label>
            <Input readOnly value={loguser.username} style={{width:"20%", marginLeft:"2%"}} />
            <br/>
            <br/>
            <label><b>DOB</b></label>
            <Input  placeholder="MM/DD/YYYY" style={{width:"20%", marginLeft:"2%"}} onChange={(e)=>dobHandler(e)}/>
            <br/>
            <br/>
            <label><b>Address</b></label>
            <TextArea rows={4} style={{width:"20%", marginLeft:"2%"}} onChange={(e)=>addressHandler(e)}/>
            <br/>
            <br/>
            <label><b>City</b></label>
            <Input  placeholder="Enter your city" style={{width:"20%", marginLeft:"2%"}} onChange={(e)=>cityHandler(e)}/>
            <br/>
            <br/>
            <label><b>State</b></label>
            <Input  placeholder="Enter your state" style={{width:"20%", marginLeft:"2%"}} onChange={(e)=>stateHandler(e)}/>
            <br/>
            <br/>
            <label><b>Country:</b></label>
            <Select value="United States"
            style={{width:"20%", marginLeft:"2%"}}
            onChange={(e)=>handleddChange(e)}
            >
                <Option value="United States">United States</Option>
                <Option value="India">India</Option>
                <Option value="United Kingdom">United Kingdom</Option>
                <Option value="Germany">Germany</Option>
                <Option value="France">France</Option>
                <Option value="Italy">Italy</Option>
                </Select>
                <br/>
                <br/>
            <label><b>Zip</b></label>
            <Input  placeholder="Enter your city" style={{width:"20%", marginLeft:"2%"}} onChange={(e)=>zipHandler(e)}/>
            <br/>
            <br/>
            <label><b>Phone</b></label>
            <Input  placeholder="Enter your Phone Number" style={{width:"20%", marginLeft:"2%"}} onChange={(e)=>phoneHandler(e)}/>
            <br/>
            <br/>
            <label><b>Email</b></label>
            <Input readOnly value={loguser.email} style={{width:"20%", marginLeft:"2%"}} />
            <br/>
            <br/>
            <div>
            </div>
            <br/>
            <Button type="primary" size="large" shape="round" onClick={(e)=>saveDetails(e)}>Add User Profile</Button>
            </div>
            
        </div>

        </div>
            )
}

export default UserProfile;

