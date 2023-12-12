import { Link } from "react-router-dom";

import { Box, Button, Divider, SvgIcon, Typography } from "@mui/material";

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
      display="flex"
      flexDirection="column"
      backgroundColor="#1B2A32"
      width={sidebarCollapsed ? "75px" : "160px"}
      sx={{
        p: 1,
        mr: -1,
        border: "5px solid #1B2A32",
      }}
    >
      <Typography fontWeight={"bold"} variant="subtitle2" sx={{ ml: 2, mt: 2 }}>
        以太坊
      </Typography>
      <Divider
        variant="middle"
        sx={{
          mb: 1,
          backgroundColor: "#FFF",
        }}
      />
      {ethereum.map((idx) => (
        <Link key={idx.link} to={`${idx.link}`}>
          <Button
            variant="outlined"
            onClick={() => setSelectedPage(idx.link)}
            size="large"
            sx={{
              mb: 1,
              color: "#eeeeee",
              borderColor: idx.link === selectedPage ? "grey[900]" : "#1B2A32",
              opacity: idx.link === selectedPage ? "1" : "0.6",
            }}
          >
            <SvgIcon>{idx.imgIcon}</SvgIcon>
            {sidebarCollapsed ? (
              ""
            ) : (
              <Typography
                fontWeight={"bold"}
                variant="subtitle1"
                sx={{
                  ml: 2,
                  width: "70px",
                  textAlign: "left",
                }}
              >
                {idx.name}
              </Typography>
            )}
          </Button>
        </Link>
      ))}
      <Typography fontWeight={"bold"} variant="subtitle2" sx={{ ml: 2, mt: 2 }}>
        供應鏈
      </Typography>
      <Divider
        variant="middle"
        sx={{
          mb: 1,
          backgroundColor: "#FFF",
        }}
      />
      {traceability.map((idx) => (
        <Link key={idx.link} to={`${idx.link}`}>
          <Button
            variant="outlined"
            onClick={() => setSelectedPage(idx.link)}
            size="large"
            sx={{
              mb: 1,
              color: "#eeeeee",
              borderColor: idx.link === selectedPage ? "grey[900]" : "#1B2A32",
              opacity: idx.link === selectedPage ? "1" : "0.6",
            }}
          >
            <SvgIcon>{idx.imgIcon}</SvgIcon>
            {sidebarCollapsed ? (
              ""
            ) : (
              <Typography
                fontWeight={"bold"}
                variant="subtitle1"
                sx={{ ml: 2, width: "70px", textAlign: "left" }}
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
              size="large"
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
              <SvgIcon>{dev.imgIcon}</SvgIcon>
              {sidebarCollapsed ? (
                ""
              ) : (
                <Typography
                  fontWeight={"bold"}
                  variant="subtitle1"
                  sx={{
                    ml: 2,
                    width: "70px",
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
