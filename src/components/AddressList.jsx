import { useEffect, useState } from "react"
import { REST_URL } from "../constants"
import { DataGrid } from "@mui/x-data-grid"
import { Button, IconButton, Snackbar, Stack } from "@mui/material"
import AddressForm from "./AddressForm"
import AddressEdit from "./AddressEdit"
import DeleteIcon from '@mui/icons-material/Delete'

function AddressList(props){
   //(1) 리스트
   //const [addresses, setAddresses] = useState([{zip:'000000', name:'길동', rdate:'2024', udate:'2025'}])
   const [addresses, setAddresses] = useState([]) //수정
    
    useEffect(() => fetchAddresses(), []) //사용이유:  첫 rendering시에만 실행하고 싶을 때 
    const fetchAddresses = () => {
        const token = sessionStorage.getItem('jwt')

        fetch(REST_URL+'api/readdresses', {headers: {'Authorization':token}})  
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => setAddresses(data._embedded.readdresses))
        .catch(err => console.error(err))  
    }

    const columns = [
        {field:'zip', headerName:'우편번호', width: 250}, 
        {field:'addr', headerName:'주소', width: 250}, 
        {field:'rdate', headerName:'등록날짜', width: 250}, 
        {field:'udate', headerName:'수정날짜', width: 250}, 
        { //del 추가
            field:'_links.self.href', 
            headerName:'', 
            sortable: false, 
            filterable: false, 
            renderCell: row => <IconButton onClick={()=> delHandler(row.id)}>
                                    <DeleteIcon color='error'/>
                                </IconButton>
            //<Button onClick={()=> delHandler(row.id)}>삭제</Button>
        }, 
        { //edit 추가
            field:'_links.readdress.href', 
            headerName:'', 
            sortable: false, 
            filterable: false, 
            renderCell: row => <AddressEdit data={row} editAddress={editAddress}/>
        }
    ]
    //(2) 삭제
    const delHandler = (url) => {
        if(window.confirm('정말 삭제할까요?')){
            const token = sessionStorage.getItem('jwt')

            fetch(url, {method: 'DELETE', headers: {'Authorization':token}})
            .then(response => {
                if(response.ok){
                    fetchAddresses()
                    setOpen(true)
                }else{
                    alert("삭제실패!! 뭔가가 잘못되었어요ㅠㅠ")
                }
            })
            .catch(err => console.error(err))  
        }  
    }

    const [open, setOpen] = useState(false) //추가

    //(3) 입력
    const addAddress = (address) => {
        const token = sessionStorage.getItem('jwt')

        //console.log(`AddressList props.username: ${props.username}`);
        address.username = props.username
        //fetch(REST_URL+'api/readdresses', {
        fetch(REST_URL+'addrs', {
            method: 'POST', 
            headers: {'Content-Type':'application/json', 'Authorization':token},
            body: JSON.stringify(address)
        })
        .then(response => {
            if(response.ok){
                fetchAddresses()    
            }else{
                alert("입력실패!! 뭔가가 잘못되었어요ㅠㅠ")
            }
        })
        .catch(err => console.error(err))
    }

    //(4) 수정
    const editAddress = (address, url) => {
        //console.log(`#editAddress() url: ${url}`);   
        const token = sessionStorage.getItem('jwt')

        fetch(url, {
            method: 'PUT', 
            headers: {'Content-Type':'application/json', 'Authorization':token},
            body: JSON.stringify(address)
        })  
        .then(response => {
            if(response.ok){
                fetchAddresses()    
            }else{
                alert("수정실패!! 뭔가가 잘못되었어요ㅠㅠ")
            }     
        }) 
        .catch(err => console.error(err))     
    }
    
    return (
        <>
        <Stack mt={2} mb={2}>
        <AddressForm addAddress={addAddress}/>
        <Button onClick={props.logout()} > 
            로그아웃
        </Button>
        </Stack>

        <div style={{height:500, width:'100%'}}>
            <DataGrid rows={addresses} columns={columns}
                getRowId={row=>row._links.self.href}
                disableSelectionOnClick={true}/> 
            <Snackbar
                autoHideDuration={2000}
                message='삭제 성공'
                open={open}
                onClose={()=>setOpen(false)}/>
            {/* <table>
            <tbody>
            {
                addresses.map((address, index)=>
                    <tr key={index}> 
                        <td>{address.zip}</td>
                        <td>{address.addr}</td>
                        <td>{address.rdate}</td>
                        <td>{address.udate}</td>
                    </tr>
                )
            }
            </tbody>
            </table> */}
        </div>
        </>
    )
}
export default AddressList