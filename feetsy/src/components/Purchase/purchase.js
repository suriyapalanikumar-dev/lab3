import {Row, Col, Card, Input, Button, Select} from 'antd';
import 'antd/dist/antd.css';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css";
import Navbar from '../Navbar/Navbar';
const Purchase = () =>
{
    const data = [{  
    Name: 'Glass Photo Frame',  
    Price:"USD 10.99",
    Date:"03-20-2022",
    PurchaseID: "0f0f9934-e055-454e-b83a-7ed8ed1d0c2e"

    },{  
        Name: 'Mobile Phone',  
        Price: "USD 300",
        Date:"03-20-2022",
        PurchaseID:"0f0f9934-e055-454e-b83a-7ed8ed1d0c2e"
    
        },
        {  
            Name: 'Glass Photo Frame',  
            Price:"USD 7.99",
            Date:"03-20-2022",
            PurchaseID:"6016fb16-642c-49a4-89dd-9b557645d937"
        
            }]  
     const columns = [{  
       Header: 'Name',  
       accessor: 'Name'  
       },
       {
       Header: 'Price',  
       accessor: 'Price'  
       },
       {
        Header: 'Date',  
        accessor: 'Date'  
        },
        {
            Header: 'PurchaseID',  
            accessor: 'PurchaseID'  
            },
      ]  
      return (  
        <div>  
            <Navbar/>
            <ReactTable  
                data={data}  
                columns={columns}  
                defaultPageSize = {3}   
                style={{marginTop:"2%"}}
            />  
            <br/>
        </div>        
    )  
}

//export default Purchase;