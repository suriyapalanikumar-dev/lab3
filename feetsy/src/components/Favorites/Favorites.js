import React, {Component, useState, useEffect} from 'react';
import {Row, Col, Card, Input, Button, Select, Tooltip} from 'antd';
import 'antd/dist/antd.css';
import axios,{post} from 'axios';
import { Navigate } from 'react-router-dom';
import {
    HeartOutlined,
    HeartFilled,
    EditOutlined
  } from '@ant-design/icons';

const {Meta} = Card;


const favcard = (card1Image, card1name, card1id, card1price) =>{
    return (

        <Card
        hoverable
        style={{ width: "75%", height:"50%" }}
        cover={<img alt="example" src={card1Image} />}
        >
        <div>
        <Row>
          <Col span={21}>
          <p>
            <span>{card1name}</span>
            <span style={{visibility:"hidden"}}>{card1id}</span>
          </p>
    
          </Col>
          <Col span={3}>
          
            <HeartFilled /> 
          
          </Col>
        </Row>
        </div>
        <p><b><span>$</span><span>{card1price}</span></b></p>
        </Card>
    )
}

const Favorites = () =>{
    const [username, setUserName] = useState("")
    const [cardDetails, setcardDetails] = useState("")

    const fetchApi = () =>{
        alert("Fetching")
        axios.post(process.env.REACT_APP_SERVER+"/fetchfavorite", {"userid":localStorage.getItem("userid")})
        .then(response=>{
            setUserName(response.data["data"][0]["usernaame"])
            var temp = response.data["data"]
            console.log(temp)
            // for (var i=0;i<temp.length;i++)
            // {
            //     // console.log(temp[i]["itemname"])
            //     // console.log(temp[i]["price"])
            //     //var cc = favcard(temp[i]["itemname"],temp[i]["price"],process.env.REACT_APP_SERVER+"/image/"+temp[i]["itemphoto"], temp[i]["itemid"])
            //     //console.log(cc)
            //     //setcardDetails(cc)
            // }
        }
        )
    } 

    useEffect = (() =>{
        fetchApi();
    },[])


    return (
    <div style={{padding:"5%"}}>
        
    </div>
    )
}
export default Favorites;