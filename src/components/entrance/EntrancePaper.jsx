import React from "react";
import { useNavigate } from "react-router-dom";
import { useSDK } from "@metamask/sdk-react";
import { useTheme } from "@mui/material/styles";

import {
  Paper,
  Box,
  Button,
  Grid,
  useMediaQuery,
  SvgIcon,
  Typography,
  TextField,
} from "@mui/material";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";
import CropFreeIcon from "@mui/icons-material/CropFree";

import { AnimateButton } from "../../ui-components";

const EntrancePaper = (props) => {
  const navigate = useNavigate();
  const paperType = props.PaperType;

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const { sdk } = useSDK();

  const navigateToContacts = () => {
    navigate("/supplier");
  };

  const metamaskHandler = async () => {
    try {
      const accounts = await sdk?.connect();
      navigateToContacts();
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  const queryHandler = async () => {
    console.error("Direct to queryPage");
  };

  return (
    <Paper
      sx={{
        p: 4,
        margin: "auto",
        maxHeight: "auto",
        flexGrow: 1,
        backgroundColor: "#fff",
      }}
    >
      <div className="container">
        <SvgIcon fontSize="large" sx={{ mr: 1 }}>
          {props.PaperType === "supplier" ? (
            <CottageRoundedIcon sx={{ color: "#237A4E" }} />
          ) : (
            <CropFreeIcon />
          )}
        </SvgIcon>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          textAlign={matchDownSM ? "center" : "inherit"}
        >
          {props.PageName}
        </Typography>
      </div>
      <Grid item xs={12}>
        <Typography
          fontWeight={"bold"}
          gutterBottom
          color={"#2F7A4F"}
          variant={"h6"}
          sx={{ mt: 1 }}
        >
          {props.Instruction}
        </Typography>
        <Typography
          variant="caption"
          fontSize="16px"
          fontWeight={"bold"}
          textAlign={matchDownSM ? "center" : "inherit"}
        >
          {paperType === "supplier" ? (
            <div style={{ padding: "26px", textAlign: "center" }}>
              驗證你的身分以繼續
            </div>
          ) : (
            <>
              <TextField
                fullWidth
                label="產品編號"
                margin="normal"
                name="lname"
                type="text"
                defaultValue=""
                sx={{ ...theme.typography.customInput }}
              />
            </>
          )}
        </Typography>
      </Grid>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item>
          <AnimateButton>
            <Button
              variant="outlined"
              fullWidth
              onClick={
                paperType === "supplier" ? metamaskHandler : queryHandler
              }
              size="large"
              sx={{
                mt: 1,
                color: "grey.800",
                backgroundColor: "#eeeeee",
                borderColor: "#e0e0e0",
              }}
            >
              <Box sx={{ mr: { xs: 2, sm: 2, width: 20 } }}>
                <img
                  src={props.ButtonIcon}
                  alt={""}
                  width={32}
                  height={32}
                  style={{ marginRight: matchDownSM ? 8 : 16 }}
                />
              </Box>
              {props.ButtonDesc}
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EntrancePaper;
