import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import LanguageIcon from '@mui/icons-material/Language';

import { LANGUAGES } from '../../i18nextConf'
import { useTranslation } from 'react-i18next';

const ITEM_HEIGHT = 48;

export default function DropdownLanguage() {
    const { i18n } = useTranslation();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const change = (code) => {
        handleClose();
        i18n.changeLanguage(code);
    }



    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <LanguageIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {LANGUAGES.map((option) => (
                    <MenuItem key={option.code} selected={option.code === i18n.language} onClick={() => change(option.code)}>
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
