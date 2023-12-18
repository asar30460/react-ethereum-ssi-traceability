import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
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

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { AnimateButton } from "..";

const EntrancePaper = ({
  setProperLogin,
  PaperType,
  PageName,
  Instruction,
  ButtonIcon,
  ButtonDesc,
}) => {
  const navigate = useNavigate();
  const paperType = PaperType;

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const [MetaMaskChecker, setMetaMaskChecker] = useState(false);
  const [currentMetaMaskAccount, setCurrentMetaMaskAccount] = useState(false);

  const queryHandler = async () => {
    console.error("Direct to queryPage");
  };

  let provider;
  let signer;
  useEffect(() => {
    async function getBrowserInfo() {
      try {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        setMetaMaskChecker(true);
        setCurrentMetaMaskAccount(signer["address"]);
        provider.destroy();
      } catch (error) {
        setCurrentMetaMaskAccount(
          "未偵測到你的瀏覽器有安裝MetaMask擴充套件，或是你尚未在MetaMask登入任何帳戶。"
        );
      }
    }
    getBrowserInfo();
  }, [open]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        margin: "auto",
        width: "240px",
        maxHeight: "auto",
        flexGrow: 1,
        backgroundColor: "#fff",
      }}
    >
      <div className="container">
        <SvgIcon fontSize="large" sx={{ mr: 1 }}>
          {PaperType === "supplier" ? (
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
          {PageName}
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
          {Instruction}
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
                InputLabelProps={{ style: { fontFamily: "Noto Serif TC" } }}
                inputProps={{ style: { fontFamily: "Noto Serif TC" } }}
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
                paperType === "supplier" ? () => setOpen(true) : queryHandler
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
                  src={ButtonIcon}
                  alt={""}
                  width={32}
                  height={32}
                  style={{ marginRight: matchDownSM ? 8 : 16 }}
                />
              </Box>
              {ButtonDesc}
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
              {MetaMaskChecker ? (
                <>
                  <DialogTitle sx={{ mb: -1 }}>
                    {"確認透過以下帳戶登入管理頁面"}
                  </DialogTitle>
                  <DialogContent>
                    <Typography fontWeight="bold" sx={{ mb: 3 }}>
                      {currentMetaMaskAccount}
                    </Typography>
                    <Typography variant="body2" color="red">
                      請注意，進到管理頁面後，即便從
                      MetaMask擴充套件更換帳戶，管理頁面的帳戶並不會一同變更，若使用者此時繼續使用交易操作，則依然以原有帳戶為主。
                      因此，為避免身分的誤用，若要更換所登入管理頁面的帳戶，務必登出後重新選擇。
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)}>關閉</Button>
                    <Button
                      disabled={MetaMaskChecker ? false : true}
                      onClick={() => {
                        setProperLogin(true);
                        setOpen(false);
                        navigate("/supplier");
                      }}
                    >
                      了解並繼續
                    </Button>
                  </DialogActions>
                </>
              ) : (
                <>
                  <DialogContent>
                    <Typography variant="subtitle1" color="red">
                      {
                        "未偵測到你的瀏覽器有安裝MetaMask擴充套件，或是你尚未在MetaMask登入任何帳戶。"
                      }
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)}>關閉</Button>
                  </DialogActions>
                </>
              )}
            </Dialog>
          </AnimateButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EntrancePaper;
