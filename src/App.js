import { Paper, Stack, Typography } from "@mui/material";

import "./App.css";
import "./components";
import { FunctionPagePaper } from "./components";

import Manufacturer from "./assets/manufacturer.svg";
import Barcode from "./assets/barcode.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Paper
          sx={{
            p: 5,
            margin: "auto",
            maxHeight: "auto",
            maxWidth: "auto",
            backgroundColor: "#FF",
          }}
        >
          <Typography
            sx={{ mb: 5, textAlign: "center" }}
            variant={"h5"}
            fontWeight={"bold"}
          >
            以太坊產品產銷整合系統
          </Typography>
          <Stack
            mt={3}
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <FunctionPagePaper
              PageName={"供應商管理"}
              Instruction={"登入"}
              Description={"驗證你的身分以繼續"}
              PageIcon={Manufacturer}
            />
            <FunctionPagePaper
              PageName={"產銷履歷查詢"}
              Instruction={"輸入編號"}
              Description={"之後改成輸入框"}
              PageIcon={Barcode}
            />
          </Stack>
        </Paper>
      </header>
    </div>
  );
}

export default App;
