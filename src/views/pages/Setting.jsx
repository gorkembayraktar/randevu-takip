
import { Alert, Box, Chip, Divider, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Tooltip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AddIcon from '@mui/icons-material/Add';

import { randevu_saatleri, DAYS, DAY_KEYS } from '../../data/constant'

import { ByGroupByData } from '../../utils/array'

import CreateWeeklyHour from '../components/modal/CreateWeeklyHour'

import { useState } from 'react';

import { useTitle } from '../../hooks/useTitle'
import DeleteDialog from '../components/modal/DeleteDialog';
import { useTranslation } from 'react-i18next';

import { useAlert } from '../../hooks/useAlert'

const Setting = () => {

    const { t } = useTranslation();

    useTitle(t('settings.title'));

    const [selectedRow, setSelectedRow] = useState(null);

    const [data, setData] = useState(randevu_saatleri);

    const dataNewView = ByGroupByData(DAY_KEYS, data, 'day');

    const { error } = useAlert();


    const onCreate = ({ day, hour }) => {
        if (hour == "") return;

        if (data.find(i => i.day == day && i.hour == hour)) {

            error(
                t('settings.already_exists')
            );

            return;
        }
        setData([
            ...data,
            {
                id: Date.now(),
                hour: hour,
                day: day,
                notAvailable: false
            }
        ])

        hideCreateWeeklyHour();
    }

    const onAvailable = (item) => {
        setData(
            data.map(i => {
                if (item.id == i.id) i.notAvailable = !i.notAvailable;
                return i;
            })
        )
    }

    const onDelete = (item) => {
        setSelectedRow(item);
    }
    const handleDelete = () => {
        if (selectedRow == null) return;

        setData(
            data.filter(i => i.id !== selectedRow.id)
        )
        setSelectedRow(null);
    }

    const [createWeeklyHourModal, setCreateWeeklyHourModal] = useState({
        day: 1,
        open: false,
    });

    const showCreateWeeklyHour = (day = 1) => {
        setCreateWeeklyHourModal({
            ...createWeeklyHourModal,
            day: day,
            open: true
        })
    }
    const hideCreateWeeklyHour = () => {
        setCreateWeeklyHourModal({
            ...createWeeklyHourModal,
            open: false
        })
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={5} xs={12}>
                    <List
                        dense
                        sx={{ width: '100%', bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="h2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} id="nested-list-subheader">
                                {t('settings.Weekly Appointment Hours')}
                                <IconButton onClick={() => showCreateWeeklyHour(1)}>
                                    <AddIcon />
                                </IconButton>
                            </ListSubheader>
                        }

                    >
                        {
                            Object.entries(dataNewView).map(([day, item]) => (
                                <>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <EventIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t(`DAYS.${DAYS[day]}`)} onClick={() => showCreateWeeklyHour(day)} />

                                    </ListItemButton>
                                    {
                                        <Box sx={{ p: 0, ml: 8, mt: 1 }}>
                                            <ViewWeeklyHour onDelete={onDelete} onAvailable={onAvailable} randevu_saatleri={item} />
                                        </Box>
                                    }
                                </>
                            ))
                        }
                    </List>

                    <Divider sx={{ my: 3 }} />

                </Grid>
            </Grid>
            <CreateWeeklyHour createWeeklyHourModal={createWeeklyHourModal} setCreateWeeklyHourModal={setCreateWeeklyHourModal} onCreate={onCreate} />

            <DeleteDialog
                props={{
                    open: selectedRow !== null,
                    title: t('dialog.delete.title'),
                    content: t('dialog.delete.content'),
                }}
                close={() => setSelectedRow(null)} // Dialog kapatma fonksiyonu
                confirm={handleDelete} // Silme işlemini gerçekleştirme fonksiyonu
            />

        </>
    );
}


const ViewWeeklyHour = ({ randevu_saatleri, onDelete, onAvailable }) => {

    const { t } = useTranslation();

    if (randevu_saatleri.length == 0)
        return <Alert severity="info">{t('settings.There is no record')}</Alert>;


    return randevu_saatleri.map(saat => (
        <Tooltip title={saat.notAvailable ? t('settings.Inactive') : t('settings.Active')}>
            <Chip onClick={() => onAvailable(saat)} sx={{ cursor: 'pointer' }} label={saat.hour} color={saat.notAvailable ? 'default' : 'success'} onDelete={() => onDelete(saat)} />
        </Tooltip>
    ))
}


export default Setting;