import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import AppsIcon from "@mui/icons-material/Apps";

import {
  Avatar,
  AppBar,
  Box,
  ButtonBase,
  SvgIcon,
  Toolbar,
} from "@mui/material";

// project imports
import LogoSection from "./LogoSection";
// import SearchSection from './SearchSection';
// import ProfileSection from './ProfileSection';
// import NotificationSection from './NotificationSection/NotificationList';

// assets
// import { IconMenu2 } from "@tabler/icons";

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.default,
        transition: theme.transitions.create("width"),
      }}
    >
      <Toolbar>
        <Box
          sx={{
            width: 228,
            display: "flex",
            [theme.breakpoints.down("md")]: {
              width: "auto",
            },
          }}
        >
          <Box
            component="span"
            sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
          >
            <LogoSection />
          </Box>

          <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                transition: "all .2s ease-in-out",
                background: theme.palette.success.light,
                color: theme.palette.success.dark,
                "&:hover": {
                  background: theme.palette.success.dark,
                  color: theme.palette.success.light,
                },
              }}
              // onClick={handleLeftDrawerToggle}
              color="inherit"
            >
              <AppsIcon />
            </Avatar>
          </ButtonBase>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
