import { Link } from "react-router-dom";

import { Box, Button, Divider, Typography } from "@mui/material";

import { navlinks } from "../../";

const SidebarSection = ({
  selectedPage,
  setSelectedPage,
  sidebarCollapsed,
}) => {
  const ethereum = navlinks["ethereum"];
  const traceability = navlinks["traceability"];
  const dev = navlinks["dev"];
  return (
    <Box
      width={sidebarCollapsed ? "65px" : "140px"}
      gap={1}
      sx={{
        p: 1,
        display: "flex",
        flexDirection: "column",
        borderColor: "#1B2A32",
        alignItems: "flex-start",
      }}
    >
      <Typography fontWeight={"bold"} variant="subtitle2" sx={{ ml: 2, mt: 2 }}>
        以太坊
      </Typography>
      {ethereum.map((idx) => (
        <Link key={idx.link} to={`${idx.link}`}>
          <Button
            variant="outlined"
            onClick={() => setSelectedPage(idx.link)}
            sx={{
              mb: 1,
              color: "#eeeeee",
              borderColor: "#1B2A32",
              opacity: idx.link === selectedPage ? "1" : "0.4",
            }}
          >
            {idx.imgIcon}
            {sidebarCollapsed ? (
              ""
            ) : (
              <Typography
                fontWeight={"bold"}
                variant="subtitle1"
                sx={{
                  ml: 2,
                  width: "65px",
                  textAlign: "left",
                }}
              >
                {idx.name}
              </Typography>
            )}
          </Button>
        </Link>
      ))}

      <Divider
        variant="middle"
        sx={{
          width: sidebarCollapsed ? "40px" : "110px",
          height: "3px",
          backgroundColor: "#223540",
        }}
      />

      <Typography fontWeight={"bold"} variant="subtitle2" sx={{ ml: 2, mt: 2 }}>
        供應鏈
      </Typography>
      {traceability.map((idx) => (
        <Link key={idx.link} to={`${idx.link}`}>
          <Button
            variant="outlined"
            onClick={() => setSelectedPage(idx.link)}
            sx={{
              color: "#eeeeee",
              borderColor: "#1B2A32",
              opacity: idx.link === selectedPage ? "1" : "0.4",
            }}
          >
            {idx.imgIcon}
            {sidebarCollapsed ? (
              ""
            ) : (
              <Typography
                fontWeight={"bold"}
                variant="subtitle1"
                sx={{ ml: 2, width: "65px", textAlign: "left" }}
              >
                {idx.name}
              </Typography>
            )}
          </Button>
        </Link>
      ))}
      <div style={{ marginTop: "auto" }}>
        {dev.map((dev) => (
          <Link key={dev.link} to={`${dev.link}`}>
            <Button
              variant="outlined"
              onClick={() => setSelectedPage(dev.link)}
              sx={{
                backgroundColor: "#FA433B",
                borderColor: dev.link === selectedPage ? "#FA433B" : "#1B2A32",
                color: "#eeeeee",
                opacity: dev.link === selectedPage ? "1" : "0.6",
                "&:hover": {
                  backgroundColor: "#FA433B",
                  borderColor: "#FA433B",
                  opacity: 1,
                },
              }}
            >
              {dev.imgIcon}
              {sidebarCollapsed ? (
                ""
              ) : (
                <Typography
                  fontWeight={"bold"}
                  variant="subtitle1"
                  sx={{
                    ml: 2,
                    width: "65px",
                    textAlign: "left",
                  }}
                >
                  {dev.name}
                </Typography>
              )}
            </Button>
          </Link>
        ))}
      </div>
    </Box>
  );
};

export default SidebarSection;
