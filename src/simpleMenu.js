import {Box, IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";


export default function SimpleMenu(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton aria-label="settings" aria-controls="simple-menu" aria-haspopup="true"
                        onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={(event) => {
                    props.handleChange(props.id, props.type, 'edit');
                    handleClose()
                }}>
                    <Box display="flex" alignItems="center">
                        <EditIcon style={{paddingRight: '10px', fontSize: '1.2rem'}}/>
                        Edit
                    </Box>
                </MenuItem>
                <MenuItem onClick={(event) => {
                    props.handleChange(props.id, props.type, 'delete');
                    handleClose()
                }}>
                    <Box display="flex" alignItems="center">
                        <DeleteIcon style={{paddingRight: '10px', fontSize: '1.2rem'}}/>
                        Delete
                    </Box>
                </MenuItem>
            </Menu>
        </div>
    )
}
