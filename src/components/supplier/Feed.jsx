import React from "react";

import { Box, Divider, Grid, Stack, Typography } from "@mui/material";

const Feed = ({ ethersInfo }) => {
  return (
    <div style={{ width: "100%", zIndex: 3 }}>
      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: "#223540",
          minHeight: { xs: "90vh", md: "90vh" },
          width: { xs: "90%", md: "96%" },
        }}
      >
        <Grid container spacing={1} justifyContent="center">
          {ethersInfo.map((item) => (
            <React.Fragment key={item.title}>
              <Grid item xs={12} md={3.9}>
                <Box
                  sx={{
                    py: 1,
                    px: 2,
                    backgroundColor: "#1b2a32",
                    color: "#E0E0E0",
                    borderRadius: "5px",
                  }}
                >
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    alignItems="flex-end"
                    spacing={0.5}
                  >
                    <Typography fontWeight={"bold"} variant="subtitle2">
                      {item.title}:
                    </Typography>
                    <Typography>{item.value}</Typography>
                  </Stack>
                </Box>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Feed;
