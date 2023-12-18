import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import SegmentIcon from "@mui/icons-material/Segment";

import {
  AppBar,
  Box,
  Button,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import { LogoSection } from "./NavbarComponent";
import MetaMask from "../../../assets/MetaMask_Fox.svg";

const Navbar = ({ ethersSigner, setcollapsed, collapsed, setSelectedPage }) => {
  const theme = useTheme();
  const [Ishover, setIsHover] = useState(false);

  // Router handlers
  const navigate = useNavigate();

  const terminate = () => {
    alert("你已登出");
    navigate("/");
  };

  return (
    <Stack>
      <AppBar
        color="inherit"
        elevation={0}
        sx={{
          position: "relative",
          bgcolor: "#1B2A32",
          color: "#E0E0E0",
          transition: theme.transitions.create("width"),
        }}
      >
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item={true} xs={2} sm={3.5}>
              <Box sx={{ color: "#E0E0E0" }}>
                <LogoSection setSelectedPage={setSelectedPage} />
                <Button
                  variant="outlined"
                  sx={{
                    background: "#223540",
                    borderColor: "#223540",
                    "&:hover": {
                      background: "#1B2A32",
                      borderColor: "#777777",
                    },
                  }}
                  onClick={() => {
                    setcollapsed(!collapsed);
                  }}
                >
                  <SegmentIcon style={{ color: "#E0E0E0" }} />
                </Button>
              </Box>
            </Grid>

            <Grid
              item
              xs={10}
              sm={8.5}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Box
                onMouseEnter={() => {
                  setIsHover(true);
                }}
                onMouseLeave={() => {
                  setIsHover(false);
                }}
                sx={{
                  width: "280px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#223540",
                  borderRadius: 10,
                  transition: "all 0.3s ease-in",
                  "&:hover": {
                    width: { xs: "280px", sm: "560px" },
                    transition: "all 0.3s ease-out",
                  },
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    px: 1,
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#1F1F1F",
                    borderRadius: 10,
                  }}
                >
                  <img src={MetaMask} alt={"MetaMaskLogo"} height={24} />
                  <Typography fontSize="14px" noWrap>
                    &nbsp;連線帳戶
                  </Typography>
                </Box>
                {Ishover ? (
                  <Typography fontSize="14px" noWrap>
                    {ethersSigner}
                  </Typography>
                ) : (
                  <Typography fontSize="14px">
                    {ethersSigner.substr(0, 5)}...
                    {ethersSigner.substr(-4, 4)}
                  </Typography>
                )}

                <Button
                  onClick={terminate}
                  sx={{
                    backgroundColor: "#CC3931",
                    borderRadius: 10,
                    color: "#FFF",
                    opacity: 0.7,
                    "&:hover": {
                      backgroundColor: "#CC3931",
                      color: "#E0E0E0",
                      opacity: 1,
                    },
                  }}
                >
                  登出
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Stack>
  );
};

export default Navbar;
