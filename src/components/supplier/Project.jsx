import { Box } from "@mui/material";

const Project = () => {
  return (
    <div style={{ width: "100%", zIndex: 3 }}>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: "#223540",
          height: { xs: "90vh", md: "90vh" },
          width: { xs: "90%", md: "96%" },
        }}
      >
        <div>Project</div>
      </Box>
    </div>
  );
};

export default Project;