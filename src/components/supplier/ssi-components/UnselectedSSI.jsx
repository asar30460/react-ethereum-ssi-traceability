import { Box, Stack, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const UnselectedSSI = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ backgroundColor: "#1b2a32", color: "#E0E0E0", width: "100%" }}
    >
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          alignContent={"center"}
          sx={{ p: 2 }}
        >
          <ReportProblemIcon color="warning" fontSize="large" sx={{ mr: 2 }} />
          <Box>
            <Typography fontWeight={"bold"} variant="subtitle1">
              請選擇DID
            </Typography>
            <Typography variant="subtitle2">
              Please Select a Decentralized Identity
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UnselectedSSI;
