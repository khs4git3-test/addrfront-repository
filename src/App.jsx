import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import AddressList from './components/AddressList';
import Login from './components/Login';
import { Button } from '@mui/material';

function App() {
  return (
  <div className="App">
    <AppBar position="static">
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h6">
      주소록 
      </Typography>
    </Toolbar>
    </AppBar>
    {/* <AddressList/> */}
    <Login/>
  </div>
  );
}
export default App;