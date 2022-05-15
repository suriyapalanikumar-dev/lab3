//6264c15d5b1655644405393d
import {Row, Col, Card, Input, Button, Select} from 'antd';
import React, { Component, useState, useEffect } from 'react';
import axios,{post} from 'axios';
// import React, {Component, useState, useEffect} from 'react'
import 'antd/dist/antd.css';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css";
import Navbar from '../Navbar/Navbar';
import { register } from '../../features/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import { authenticateUser, login, logout, dollarSelect,itemSelect, dollarInitial,itemCOnsidered } from '../../features/userSlice';

const {Option} = Select;
const Purchase = () =>
{
    const [page, setpage] = useState([5])
    const dispatch = useDispatch();
    const loguser = useSelector(authenticateUser)
    const [purchased, setpurchased] = useState([])
    const [pval, setpval] = useState([])
    const [currentp, setp] = useState(5)
    // const val = [
    //     {
    //         "createdAt": "2022-04-24T18:52:20.198Z",
    //         "isFavorite": "No",
    //         "itemcategory": "Jewellery",
    //         "itemcount": 5,
    //         "itemdesc": "Gold Jewellery with matte finish",
    //         "itemname": "Necklace",
    //         "itemphoto": "1650826336179-necklace.jpg",
    //         "itemsold": 3,
    //         "price": 908.99,
    //         "shopname": "dummyshop",
    //         "orderid":"6265bbde1b526e06768a79c2",
    //         "date":"2022-04-24T21:06:38.433Z"
    //     }
    // ]
    
    useEffect(() => {
        axios.post(process.env.REACT_APP_SERVER + "/mypurchases",{},{ headers: {"Authorization" : `Bearer ${loguser.token}`} })
        
        .then(response => {
          var temp = []
          response.data["temp2"].forEach(element => {
              var t = element
              t.orderid = response.data["map_id"][element["_id"]]
              t.date = response.data["map_date"][element["_id"]]
              t.gift = response.data["map_gift"][element["_id"]]
              temp.push(t)
              
          });
          setpurchased(temp)
          testChange(5)
        })
        .catch(function (err) {
          alert(err)
          console.log(err)
        })
        
    }, []);

    const testChange= (value) =>{
        console.log(purchased)
        if(purchased.length<=value){
            setpval(purchased)
        }
        else{
            let tt = purchased.slice()
            let ar2 = tt.splice(0,value)
            setpval(ar2)
        }
    }

      return (  
        <div>  
            {console.log(pval)}
            <Navbar/>
            <div>
                <h2><b>Your Purchases!</b></h2>
                <label><b>Select Pagination: </b> </label>
                <Select style={{width:"100px", marginLeft:"3px"}} defaultValue="Page 0" onChange={(e)=>testChange(e)}>
                    {[1,2,3,4,5,6,7,8,9,10].map((element)=>
                       
                        <Option key={element} value={element}>Page {element}</Option>
                    )}
                </Select>
                <br/>
                <br/>
                <div>
                    <Row>
                {pval.map((element) => <Col span={12} style={{paddingLeft:"2%"}}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" }}
                cover={<img alt="example" src={process.env.REACT_APP_SERVER+"/image/"+element.itemphoto} />}
              >
                <div>
                  <Row>
                    <Col span={24}>
                      <p align="center" style={{fontSize:"15px"}}>Itemname:<b>{element.itemname}</b></p>
                      {/* <p style={{ visibility: "hidden" }}>{element._id}</p> */}
                      {/* <p style={{ visibility: "hidden" }}>{element._id}</p> */}

                    </Col>
                    <Col span={24}>
                    <p align="center" style={{fontSize:"15px"}}>Itemname:<b>{element.orderid}</b></p>
                    </Col>
                    <Col span={24}>
                    <p align="center" style={{fontSize:"15px"}}>Quantity:<b>{element.itemsold}</b></p>
                    </Col>
                    <Col span={24}>
                    <p align="center" style={{fontSize:"15px"}}>Purchase Date:<b>{element.date.substring(0,10)}</b></p>
                    </Col>
                    <Col span={24}>
                    <p align="center" style={{fontSize:"15px"}}>Price each:<b>{element.price}</b></p>
                    </Col>
                    <Col span={24}>
                   {element.gift!=""? <p align="center" style={{fontSize:"15px"}}>Gift Description:<b>{element.gift}</b></p>:null}
                    </Col>
                  </Row>
                </div>
                
              </Card>
            </Col>)}
            </Row>
                </div>
            </div>
            
        </div>        
    )  
}

export default Purchase;