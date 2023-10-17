import { Paper, Stack, Typography } from "@mui/material";
import MetaMask from "../../assets/MetaMask_Fox.svg";
import SearchIcon from "../../assets/searchIcon.svg";

import { EntrancePaper } from "../";

const Entrance = () => {
  return (
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
        <EntrancePaper
          PaperType={"supplier"}
          PageName={"供應商管理"}
          Instruction={"登入"}
          ButtonIcon={MetaMask}
          ButtonDesc={"透過METAMASK登入"}
        />
        <EntrancePaper
          PaperType={"client"}
          PageName={"產銷履歷查詢"}
          Instruction={"輸入編號"}
          ButtonIcon={SearchIcon}
          ButtonDesc={"查詢"}
        />
      </Stack>
    </Paper>
  );
};

export default Entrance;
