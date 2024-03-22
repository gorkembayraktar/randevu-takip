import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import PersonIcon from '@mui/icons-material/Person';
import { Button, Popper } from '@mui/material';




export default function TextFieldSearchCustomer({ value, setValue, addNewCustomer = null }) {

    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);

    const fetch = React.useMemo(
        () =>
            debounce((request, callback) => {
                //  


                callback([{
                    id: 1,
                    fullname: 'Hakan',
                    phone: '0553555',
                    email: 'test@test.com'
                }]);

                //autocompleteService.current.getPlacePredictions(request, callback);
            }, 400),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {


            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Autocomplete
            id="google-map-demo"
            fullWidth
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : `${option.fullname} - ${option.phone}`
            }
            size='small'
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText={<>
                Müşteri bulunamadı.
                <Button variant="outlined" size='small' sx={{ ml: 1 }} onClick={addNewCustomer}>Müşteri ekle</Button>
            </>}
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label="Müşteri Seçiniz" fullWidth />
            )}
            renderOption={(props, option) => {


                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                <PersonIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                <Box

                                    component="span"
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    {option.fullname}
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {option.phone} - {option.email}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
}
