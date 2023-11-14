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

const Navbar = ({ setcollapsed, collapsed, setSelectedPage }) => {
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
            <Grid container>
              <Grid item={true} xs={6}>
                <Box>
                  <LogoSection setSelectedPage={setSelectedPage} />

                  <ButtonBase>
                    <Avatar
                      variant="rounded"
                      sx={{
                        transition: "all .2s ease-in-out",
                        background: "#B5EBCD",
                        color: theme.palette.success.main,
                        "&:hover": {
                          background: theme.palette.success.light,
                          color: "#FFF",
                        },
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
