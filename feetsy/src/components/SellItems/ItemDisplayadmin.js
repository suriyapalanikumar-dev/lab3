import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css";

const ItemDisplayAdmin = () =>{
  const data = [{  
    Name: 'Table Cloth',  
    Category: 'Home Decore' ,
    Price:5.99,
    Sold:2
    },{  
      Name: 'Glass Photo Frame',  
      Category: 'Party' ,
      Price:10.99,
      Sold:2
      }]  
 const columns = [{  
   Header: 'Name',  
   accessor: 'Name'  
   },{  
   Header: 'Category',  
   accessor: 'Category'  
   },
   {
   Header: 'Price',  
   accessor: 'Price'  
   },
   {
   Header: 'Sold',  
   accessor: 'Sold'  
   }]  
  return (  
    <div>  
        <ReactTable  
            data={data}  
            columns={columns}  
            defaultPageSize = {2}  
            pageSizeOptions = {[2,4, 6]}  
        />  
    </div>        
)  
}

export default ItemDisplayAdmin;