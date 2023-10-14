import { useTheme } from "@mui/material/styles";

import {
  Paper,
  Box,
  Button,
  Grid,
  useMediaQuery,
  Typography,
} from "@mui/material";

import { AnimateButton } from "../../ui-components";
import MetaMask from "../../assets/MetaMask_Fox.svg.png";

const FunctionPagePaper = (props) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const googleHandler = async () => {
    console.error("Login");
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
      <div class="container">
        <div class="image">
          <img
            src={props.PageIcon}
            alt="Manufacturer"
            width={64}
            height={64}
            style={{ marginRight: matchDownSM ? 8 : 16 }}
          />
        </div>
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
        >
          {props.Instruction}
        </Typography>
        <Typography
          variant="caption"
          fontSize="16px"
          fontWeight={"bold"}
          textAlign={matchDownSM ? "center" : "inherit"}
        >
          {props.Description}
        </Typography>
      </Grid>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item>
          <AnimateButton>
            <Button
              variant="outlined"
              fullWidth
              onClick={googleHandler}
              size="large"
              sx={{
                mt: 1,
                color: "grey.800",
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100],
              }}
            >
              <Box sx={{ mr: { xs: 2, sm: 2, width: 20 } }}>
                <img
                  src={MetaMask}
                  alt="MetaMask"
                  width={32}
                  height={32}
                  style={{ marginRight: matchDownSM ? 8 : 16 }}
                />
              </Box>
              透過METAMASK登入
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FunctionPagePaper;
