import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material"
import { useState } from "react"
import EditIcon from '@mui/icons-material/Edit'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

function AddressEdit(props){
    //(1) open
    const [open, setOpen] = useState(false)
    const openHandler = () => {
        setAddress({zip: props.data.row.zip, addr:props.data.row.addr})
        setOpen(true)
    }
    const closeHandler = () => {
        setOpen(false)
    }
    //(2) address
    const [address, setAddress] = useState( {zip: '', addr: ''} )
    const changeHandler = e => {
        setAddress({...address, [e.target.name]:e.target.value})
        //console.log(`address.zip: ${address.zip}, address.addr: ${address.addr}`)
    } 
    //(3) edit()
    const editHandler = () => {
        props.editAddress(address, props.data.id)//수정로직 추가
        closeHandler()
    }
    return (
        <div>
            {/* <Button onClick={openHandler}>편집</Button> */}
            <IconButton onClick={openHandler}>
                <EditIcon color='primary'/>
            </IconButton>
            <Dialog open={open} onClose={closeHandler}>
                <DialogTitle>주소 수정</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                    <TextField label='우편번호' name='zip' autoFocus variant="standard"
                    value={address.zip} onChange={changeHandler}/><br/>
                    <TextField label='주소' name='addr' variant="standard"
                    value={address.addr} onChange={changeHandler}/><br/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeHandler}>취소</Button>
                    <Button onClick={editHandler}>수정</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default AddressEdit