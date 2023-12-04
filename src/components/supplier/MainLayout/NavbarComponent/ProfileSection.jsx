import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Card,
  Chip,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";

import { Transitions } from "../../..";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = (props) => {
  // Page handlers
  const theme = useTheme();

  const [notification, setNotification] = useState(false);
  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = "") => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== "") {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Router handlers
  const navigate = useNavigate();

  const terminate = () => {
    alert("你已登出");
    navigate("/");
  };

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          width: "84px",
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          backgroundColor: theme.palette.grey[500],
          '&[aria-controls="menu-list-grow"], &:hover': {
            background: `${theme.palette.success.main}!important`,
            color: theme.palette.grey[100],
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        avatar={
          <Avatar sx={{ minHeight: 36, minWidth: 36 }}>
            <PersonIcon />
          </Avatar>
        }
        label={<SettingsIcon />}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        variant="outlined"
        color="success"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Card elevation={16} shadow={theme.shadows[16]}>
                  <Box sx={{ px: 2, pt: 2 }}>
                    <Stack sx={{ mb: 1 }}>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography
                          component="span"
                          fontWeight="bold"
                          variant="subtitle2"
                        >
                          連線帳戶:
                        </Typography>
                        <Typography
                          variant="h4"
                          fontSize="1rem"
                          fontWeight="bold"
                        >
                          {props.ethersSigner.substr(0, 5)}...
                          {props.ethersSigner.substr(-4, 4)}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2" align="left">
                        Project Admin
                      </Typography>
                    </Stack>

                    <Divider />

                    <Stack sx={{ my: 2 }}>
                      <Card
                        sx={{
                          display: "flex",
                          boxShadow: "0",
                          p: 2,
                          background: "#EEEEEE",
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ pt: 0.3, mr: 7 }}>
                          允許通知
                        </Typography>
                        <Switch
                          checked={notification}
                          onChange={(e) => setNotification(e.target.checked)}
                          name="sdm"
                          size="small"
                        />
                      </Card>
                    </Stack>

                    <Divider />

                    <List
                      component="nav"
                      sx={{
                        width: "100%",
                        maxWidth: 350,
                        minWidth: 150,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "10px",
                        [theme.breakpoints.down("md")]: {
                          minWidth: "100%",
                        },
                        "& .MuiListItemButton-root": {},
                      }}
                    >
                      <ListItemButton
                        sx={{
                          borderRadius: "5px",
                        }}
                        onClick={(event) => handleListItemClick(event, 0, "#")}
                      >
                        <ListItemIcon>
                          <SearchIcon stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">設定</Typography>
                          }
                        />
                      </ListItemButton>

                      <ListItemButton
                        sx={{
                          borderRadius: "5px",
                        }}
                        selected={selectedIndex === 4}
                        onClick={terminate}
                      >
                        <ListItemIcon>
                          <LogoutIcon stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">登出</Typography>
                          }
                        />
                      </ListItemButton>
                    </List>
                  </Box>
                </Card>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
