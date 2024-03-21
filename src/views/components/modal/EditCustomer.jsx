import { Button, ButtonGroup, TextField, Typography } from "@mui/material";


import { memo, useEffect, useState } from "react";
import { useAlert } from "../../../hooks/useAlert";
import { CenterModal, Title, Description, Footer } from './index'


function EditCustomer({ open, close, data, onsuccess }) {

    const handleClose = () => close();


    const { success } = useAlert();

    const [form, setForm] = useState({});

    useEffect(() => {
        setForm({
            name: data?.fullname,
            phone: data?.phone,
            note: data?.note
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


    const handleUpdate = () => {
        success("Müşteri bilgileri güncellendi.");
        onsuccess({
            id: data.id,
            fullname: form.name,
            phone: form.phone,
            note: form.note
        });
        handleClose();
    }





    return <CenterModal open={open}>
        <Title>
            <Typography fontFamily="revert" fontWeight="bold" sx={{ textAlign: 'left', py: 2, px: 1 }}>
                Müşteri Düzenle
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
                value={form.name}
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
                value={form.phone}
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
                    onClick={handleUpdate}
                >
                    Güncelle
                </Button >
            </ButtonGroup>
        </Footer>
    </CenterModal>




}




export default memo(EditCustomer)
