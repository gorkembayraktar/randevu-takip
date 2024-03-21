
import { Button, ButtonGroup, Paper, TextField, Typography } from '@mui/material';



const Telegram = () => {

    return <Paper sx={{ p: 2 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Telegram API Ayarları
        </Typography>
        <Typography component="p">
            Randevuların takibi için telegram bot oluşturun ve token değerini kaydedin.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>

            <TextField
                required
                id="outlined-required"
                label="TOKEN"
                defaultValue=""
                sx={{ mb: 2 }}
                fullWidth
            />

        </Typography>
        <ButtonGroup sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
            <Button
                aria-label="delete" variant="outlined" size="small" color="success" >
                Kaydet
            </Button >
        </ButtonGroup>

    </Paper>
}




export default Telegram;