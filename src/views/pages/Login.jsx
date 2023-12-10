import { styled } from '@mui/material/styles';
import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { Alert, Button, Container, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { useNavigate, Navigate  } from "react-router-dom";




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400
};


export default function Login() {


    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const [sending, setSending] = React.useState(false);

    const loginHandle = async () => {
            setError('');
            //setSending(true);
            navigate('/');
    }


  return (
    <Container dark sx={{ pt:3 }}  style={{minHeight:"80vh"}} dark>
        <Item sx={{ maxWidth:300}} style={style}>
        <Box sx={{ '& > :not(style)': { m: 1 }, display:'flex', flexDirection: 'column', }}  >
        <Typography variant="h4" gutterBottom>
            Randevu Takip
        </Typography>
        {
            error &&
            <Alert severity="error">{ error }</Alert>
        }
        
        <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
            Kullanıcı Adı
            </InputLabel>
            <Input
            value={username}
            onChange={(e) => setUsername(e.target.value) }
            id="input-with-icon-adornment"
            startAdornment={
                <InputAdornment position="start">
                <AccountCircle />
                </InputAdornment>
            }
            />
        </FormControl>
        <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
            Şifre
            </InputLabel>
            <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)  }
            type="password"
            id="input-with-icon-adornment"
            startAdornment={
                <InputAdornment position="start">
                <LockIcon />
                </InputAdornment>
            }
            />
        </FormControl>
        <Button variant="outlined" onClick={loginHandle} disabled={sending}>
            { sending ? 'Bekleniyor..' : 'Giriş yap'}
        </Button>

        </Box>
        </Item>
    </Container>
  );
}