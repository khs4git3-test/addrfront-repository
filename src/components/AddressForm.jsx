import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material"
import { useState } from "react"

function AddressForm(props){ //수정
    //(1) open
    const [open, setOpen] = useState(false)
    const openHandler = () => {
        setAddress({zip: '', addr: ''})
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
    //(3) save()
    const saveHandler = () => {
        props.addAddress(address) //저장로직 추가 
        closeHandler()
    }
    return(
        <div>
            <Button variant='contained' onClick={openHandler}>입력</Button>
            <Dialog open={open} onClose={closeHandler}>
                <DialogTitle>새 주소</DialogTitle>
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
                    <Button onClick={saveHandler}>저장</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default AddressForm