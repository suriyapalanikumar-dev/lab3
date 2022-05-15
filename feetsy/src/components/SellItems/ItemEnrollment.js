import React, {Component, useState} from 'react';
import {Row, Col, Card, Input, Button, Select} from 'antd';
import 'antd/dist/antd.css';
import axios,{post} from 'axios';
import { Navigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { register } from '../../features/userSlice';
import { authenticateUser, login, logout, shopSelect } from '../../features/userSlice';

const { Option } = Select;
const {TextArea} = Input;


const ItemEnrollment = () =>{
    const dispatch = useDispatch();
    const loguser = useSelector(authenticateUser)
    const [addname, setAddName] = useState("")
    const [addcategory, setAddcategory] = useState("")
    const [addquantity, setQuantity] = useState("")
    const [addprice, setPrice] = useState("")
    const [adddesc, setDesc] = useState("")
    const [addimg, setAddImg] = useState(null)
    const [newcat, disnewcat] = useState(true)
    const [itemstore, setItemStoreFile] = useState(null)

    const handleCategory = (e) =>{
        if(e!="New Category")
        {
            setAddcategory(e)
        }
        else{
            disnewcat(false)
        }
       
    }

    const changeFileItem = (e) =>{
        let data = e.target.files[0]
        setItemStoreFile(e.target.files[0])
    }

    const changeItemFile = (e) =>{
        //let data = e.target.files[0]
        setAddImg(e.target.files[0])
    }

    const fileUploadItem = (file) =>{
        const url = process.env.REACT_APP_SERVER+'/uploaditemdp';
        const formData = new FormData();
        formData.append('profile-file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
    }

    const updatePath =(e) =>{
        e.preventDefault()
        fileUploadItem(itemstore).then((response)=>{
            setAddImg(response.data["data"]["Key"])
        })
    }

    const enrollItem = (e) =>
    {
        //alert("Item Enrolled Successfully")
      e.preventDefault();
       let data = {
           "itemname" : addname,
           "itemcount": addquantity,
           "itemphoto": addimg,
           "itemcategory":addcategory,
           "itemdesc":adddesc,
           "price":addprice,
           "shopname":loguser["shopname"]
       }
       console.log(data)
       axios.post(process.env.REACT_APP_SERVER+'/addItem', data)
       .then(function (response){
           //alert("Items Created successfully")
           setAddName(()=>"")
           setAddcategory(null)
           setAddcategory(null)
           setPrice(null)
           setDesc(null)
           setAddImg(null)
           alert("Item Enrollment Successful")
           console.log(response.data)
       })
       .catch(function (err){
           alert("Item Enrollment not successful."+err)
       })   

    }
    return (
        <div>
            <h2><b>Add Items</b></h2>
            <label>Name</label>
            <Input size="large" placeholder="Enter Item name" onChange={(e)=>setAddName(e.target.value)}/>
            <br/>
            <label>Quantity Available</label>
            <Input size="large" placeholder="Enter quantity" onChange={(e)=>setQuantity(e.target.value)}/>
            <br/>
            <label>Category</label>
            <br/>
            <Row>
            <Col span = {12}>
                <Select
                size="large"
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())                
            }
                onChange = {(e)=>handleCategory(e)}
            >
                <Option value="Clothing">Clothing</Option>
                <Option value="Jewellery">Jewellery</Option>
                <Option value="Entertainment">Entertainment</Option>
                <Option value="Home Decor">Home Decor</Option>
                <Option value="Art">Art</Option>
                <Option value="New Category">New Category</Option>
                </Select>
            </Col>
            <Col span = {12}>
                <Input size="large" disabled={newcat} placeholder="Enter new Category" onChange={(e)=>setAddcategory(e.target.value)}/>
            </Col>
            </Row>
            <label>Description</label>
            <TextArea rows={4} onChange={(e)=>setDesc(e.target.value)} />
            <br/>
            <label>Price per Item</label>
            <Input size="large"  placeholder="Enter Price" onChange={(e)=>setPrice(e.target.value)}/>
            <br/>
            <br/>
            <div>
            {/* <form onSubmit={(e) => updatePath(e)}>
            <div>
                <label>Upload Item picture: </label>
                <input type="file" name="profile-file" required/>
            </div>
            <div>
                <input type="submit" value="Upload"/>
            </div>
            </form> */}
            <form onSubmit={(e) => updatePath(e)}>
            <div>
                <label>Upload profile picture</label>
                <input type="file" name="profile-file" onChange={(e)=>changeFileItem(e)} required/>
            </div>
            <div>
                <input type="submit" value="Upload" />
            </div>
            </form>
            </div>
            <br/>
            <Button type="primary" size="large" shape="round" onClick={(e)=>enrollItem(e)}>Add Item</Button>
        </div>
    )
}

export default ItemEnrollment;