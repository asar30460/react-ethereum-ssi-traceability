import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const InvalidAlert = () => {
  // Router handlers
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "80vh" }}
    >
      <Box backgroundColor="#223540" borderRadius="5px" sx={{ px: 3, pb: 2 }}>
        <Grid item xs={12}>
          <Box display="flex" direction="row" alignItems={"center"}>
            <ReportProblemIcon
              color="warning"
              fontSize="large"
              sx={{ mr: 2 }}
            />
            <h3>無效的登入行為</h3>
          </Box>
          <Typography variant="subtitle1">
            看到此訊息表示你進行了以下操作：
          </Typography>
          <Typography variant="body1">(1)&nbsp;重新整理頁面</Typography>
          <Typography variant="body1">
            (2)&nbsp;跳過登入程序直接導向管理頁面網址
          </Typography>
        </Grid>
        <Box display="flex" justifyContent="center">
          <Button
            onClick={() => navigate("/")}
            sx={{
              mt: 2,
              color: "#eeeeee",
              borderColor: "#1B2A32",
              backgroundColor: "#025C24",
              "&:hover": {
                backgroundColor: "#027D32",
              },
            }}
          >
            <Typography variant="subtitle1">返回入口</Typography>
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default InvalidAlert;
