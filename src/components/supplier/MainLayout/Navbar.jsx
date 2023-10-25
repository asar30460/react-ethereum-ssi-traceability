// material-ui
import { useTheme } from "@mui/material/styles";
import AppsIcon from "@mui/icons-material/Apps";

import {
  Avatar,
  AppBar,
  Box,
  ButtonBase,
  Grid,
  Stack,
  Toolbar,
} from "@mui/material";

import { LogoSection, ProfileSection } from "./NavbarComponent";

const Navbar = ({ setcollapsed, collapsed }) => {
  const theme = useTheme();

  return (
    <>
      <Stack>
        <AppBar
          color="inherit"
          elevation={0}
          sx={{
            position: "sticky",
            bgcolor: "#1B2A32",
            transition: theme.transitions.create("width"),
          }}
        >
          <Toolbar>
            <Grid container spacing={0}>
              <Grid item={true} xs={6}>
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
                      onClick={() => {
                        setcollapsed(!collapsed);
                      }}
                      color="inherit"
                    >
                      <AppsIcon />
                    </Avatar>
                  </ButtonBase>
                </Box>
              </Grid>
              <Grid item={true} xs={6} container justifyContent="flex-end">
                <ProfileSection />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Stack>
    </>
  );
};

export default Navbar;
