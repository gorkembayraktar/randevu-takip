import { Button, ButtonGroup, TextField, Typography } from "@mui/material";


import { memo, useEffect, useState } from "react";
import { useAlert } from "../../../hooks/useAlert";
import { CenterModal, Title, Description, Footer } from './index'
import { FourMp } from "@mui/icons-material";
import { useTranslation } from "react-i18next";


function EditCustomer({ open, close, data, onsuccess }) {

    const { t } = useTranslation();

    const handleClose = () => close();


    const { success } = useAlert();

    const [form, setForm] = useState({});

    useEffect(() => {
        setForm({
            name: data?.fullname,
            phone: data?.phone,
            note: data?.note,
            email: data?.email
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
        success(t('customer.Customer information has been updated'));
        onsuccess({
            id: data.id,
            fullname: form.name,
            phone: form.phone,
            note: form.note,
            email: form.email
        });
        handleClose();
    }





    return <CenterModal open={open}>
        <Title>
            <Typography fontFamily="revert" fontWeight="bold" sx={{ textAlign: 'left', py: 2, px: 1 }}>
                {t('customer.Edit Customer')}
            </Typography>
        </Title>
        <Description>
            <TextField
                required
                id="outlined-required"
                label={t('customer.column.fullname')}
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
                label={t('customer.column.phone')}
                name="phone"
                size="small"
                onChange={handleForm}
                value={form.phone}
                fullWidth
                sx={{ mb: 1 }}
            />
            <TextField
                required
                id="outlined-required"
                label={t('customer.column.email')}
                name="email"
                size="small"
                onChange={handleForm}
                value={form.email}
                fullWidth
                sx={{ mb: 1 }}
            />

            <TextField
                multiline
                label={t('customer.column.note')}
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
                    {t('cancel')}
                </Button >
                <Button
                    aria-label="delete"
                    variant="outlined"
                    size="small"
                    color="success"
                    onClick={handleUpdate}
                >
                    {t('update')}
                </Button >
            </ButtonGroup>
        </Footer>
    </CenterModal>




}




export default memo(EditCustomer)
