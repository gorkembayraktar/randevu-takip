import { Alert, Button, ButtonGroup, TextField, Typography } from "@mui/material";


import { memo, useEffect, useState } from "react";
import { useAlert } from "../../../hooks/useAlert";
import { CenterModal, Title, Description, Footer } from './index'


function CreateCustomer({ open, close, onsuccess }) {

    const handleClose = () => close();


    const { success } = useAlert();

    const [form, setForm] = useState({});

    useEffect(() => {
        setForm({
            name: '',
            phone: '',
            note: ''
        });
    }, [open])

    const handleForm = (e) => {
        setFormItem(e.target.name, e.target.value);
    }
    const setFormItem = (name, value) => {
        setForm({
            ...form,
            [name]: value
        });
    }


    const handleCreate = () => {
        success("Müşteri oluşturuldu.");
        onsuccess({
            id: Date.now(),
            fullname: form.name,
            phone: form.phone,
            note: form.note,
            created_at: new Date()
        });
        handleClose();
    }





    return <CenterModal open={open}>
        <Title>
            <Typography fontFamily="revert" fontWeight="bold" sx={{ textAlign: 'left', py: 2, px: 1 }}>
                Müşteri Ekle
            </Typography>
        </Title>
        <Description>
            <TextField
                required
                id="outlined-required"
                label="Ad Soyad"
                name="name"
                size="small"
                onChange={handleForm}
                fullWidth
                sx={{ mb: 1 }}
            />
            <TextField
                required
                id="outlined-required"
                label="Telefonu"
                name="phone"
                size="small"
                onChange={handleForm}
                fullWidth
                sx={{ mb: 1 }}
            />

            <TextField
                multiline
                label="Not"
                type="text"
                rows={2}
                value={form.note}
                fullWidth
                size="small"
                name="note"
                onChange={handleForm}
                sx={{ mb: 1, mt: 1 }}
            />
        </Description>
        <Footer>
            <ButtonGroup sx={{ float: 'right' }}>
                <Button aria-label="delete" size="small" onClick={handleClose}>
                    Vazgeç
                </Button >
                <Button
                    aria-label="delete"
                    variant="outlined"
                    size="small"
                    color="success"
                    onClick={handleCreate}
                >
                    Oluştur
                </Button >
            </ButtonGroup>
        </Footer>
    </CenterModal>




}




export default memo(CreateCustomer)
