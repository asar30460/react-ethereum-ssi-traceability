import { Box } from "@mui/material";

const SSI = () => {
  return (
    <div style={{ width: "100%", zIndex: 3 }}>
      <Box
        sx={{
          p: 1,
          borderRadius: 2,
          backgroundColor: "#223540",
          height: { xs: "91vh", md: "90vh" },
          width: { xs: "90%", md: "96%" },
        }}
      >
        <div>SSI</div>
      </Box>
    </div>
  );
};

export default SSI;
