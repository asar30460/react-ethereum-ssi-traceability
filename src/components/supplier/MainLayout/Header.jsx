// material-ui
import { useTheme } from "@mui/material/styles";
import AppsIcon from "@mui/icons-material/Apps";

import { Avatar, AppBar, Box, ButtonBase, Grid, Toolbar } from "@mui/material";

// project imports
import { LogoSection, ProfileSection } from "./HeaderComponent";
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
        
        +
        <Grid container spacing={0}>
          <Grid xs={6}>
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
                sx={{ display: { xs: "none", md: "block" }, mr: 3 }}
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
                    background: "#B5EBCD",
                    color: theme.palette.success.main,
                    "&:hover": {
                      background: theme.palette.success.light,
                      color: "#FFF",
                    },
                    my: 0.5,
                  }}
                  // onClick={handleLeftDrawerToggle}
                  color="inherit"
                >
                  <AppsIcon />
                </Avatar>
              </ButtonBase>
            </Box>
          </Grid>
          <Grid xs={6} container justifyContent="flex-end">
            <ProfileSection />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
