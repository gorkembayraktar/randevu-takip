import { Box, Divider, Modal, Typography } from "@mui/material";

const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -10%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function CenterModal({ open, children }){
    const childMap = {};

    children.forEach((child) => {
      // Her bir çocuğu anahtarına göre eşle
      childMap[child.type.name] = child;
    });

    return  <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            {childMap?.Title}
            {childMap?.Description}
            <Divider  sx={{my:3}}/>
            {childMap?.Footer}
        </Box>
    </Modal>
}

export const Title = ({children}) => {
    return (
        <Typography id="modal-modal-title" variant="h6" component="h2">
            {children}
        </Typography>
    )
}

export const Description = ({children}) => {
    return (
        <div id="modal-modal-description" sx={{ mt: 2 }}>
            {children}
        </div>
    )
}

export const Footer = ({children}) => {
    return (
        <div id="modal-modal-footer" sx={{ mt: 2 }}>
             {children}
        </div>
    )
}
export default CenterModal;
