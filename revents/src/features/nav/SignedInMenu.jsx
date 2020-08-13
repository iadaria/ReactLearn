import React, { useState, Fragment } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
//import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../auth/authActions';

export default function SignedInMenu() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.auth);
    const history = useHistory();

    const [anchorE1, setAnchorE1] = useState(null);
    const open = Boolean(anchorE1);

    const handleMenu = (event) => {
        setAnchorE1(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorE1(null);
    };

    function logout() {
        handleClose();
        dispatch(signOutUser());
        history.push('/');
    }

    return (
        <div className="account">
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <Fragment>
                    <Avatar
                        alt={currentUser?.email}
                        sizes="(max-width: 35px): 30px"
                        src={currentUser.photoURL || '/assets/user.png'}
                    />
                    <Typography style={{ marginLeft: 15 }} component="b">
                        {currentUser?.email}
                    </Typography>
                </Fragment>
            </IconButton>

            <Menu
                id="menu-appbar"
                anchorEl={anchorE1}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    component={NavLink}
                    to="/createEvent"
                    onClick={handleClose}
                >
                    Create Event
                </MenuItem>

                <MenuItem
                    //component={NavLink}
                    //to={`/profile/${currentUser?.currentUsername}`}
                    onClick={handleClose}
                >
                    My profile
                </MenuItem>

                <MenuItem onClick={logout}>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}
