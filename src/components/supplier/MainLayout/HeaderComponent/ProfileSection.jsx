import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSDK } from "@metamask/sdk-react";

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

import { Transitions, MainCard } from "../../../../ui-components";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

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

  const { sdk, connected, connecting} = useSDK();

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
  useEffect(() => {}, []);

  const navigateToEntrance = () => {
    navigate("/");
  };
  
  const terminate = () => {
    sdk?.terminate();
    alert("你已登出");
    navigateToEntrance();
  };

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.grey[100],
          backgroundColor: theme.palette.grey[100],
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.success.main,
            background: `${theme.palette.success.main}!important`,
            color: theme.palette.grey[100],
            "& svg": {
              stroke: theme.palette.grey[100],
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={PersonIcon}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <SettingsIcon
            stroke={1.5}
            size="1.5rem"
            color={theme.palette.success.light}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
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
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ px: 2, pt: 2 }}>
                    <Stack sx={{ mb: 1 }}>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography
                          variant="h4"
                          fontSize={"1rem"}
                          fontWeight={"bold"}
                        >
                          Good Morning,
                        </Typography>
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{ fontWeight: 400 }}
                          fontSize={"1rem"}
                        >
                          Johne Doe
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">Project Admin</Typography>
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
                          Allow Notifications
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
                        minWidth: 250,
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
                            <Typography variant="body2">
                              Customized Settings
                            </Typography>
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
                            <Typography variant="body2">Logout</Typography>
                          }
                        />
                      </ListItemButton>
                    </List>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
