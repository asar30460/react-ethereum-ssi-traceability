import { Link } from "react-router-dom";

import { Box, Button, Divider, SvgIcon, Typography } from "@mui/material";

import { navlinks } from "../../";

const SidebarSection = ({
  selectedPage,
  setSelectedPage,
  sidebarCollapsed,
}) => {
  const general = navlinks["general"];
  const advanced = navlinks["advanced"];
  const dev = navlinks["dev"];
  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor="#1B2A32"
      width={sidebarCollapsed ? "75px" : "160px"}
      sx={{
        p: 1,
        mr: -2,
        border: "5px solid #1B2A32",
      }}
    >
      <Typography fontWeight={"bold"} variant="subtitle2" sx={{ ml: 2, mt: 2 }}>
        一般
      </Typography>
      <Divider
        variant="middle"
        sx={{
          mb: 1,
          backgroundColor: "#FFF",
        }}
      />
      {general.map((general) => (
        <Link key={general.link} to={`${general.link}`}>
          <Button
            variant="outlined"
            onClick={() => setSelectedPage(general.link)}
            size="large"
            sx={{
              px: 2,
              mb: 1,
              color: "#eeeeee",
              borderColor:
                general.link === selectedPage ? "grey[900]" : "#1B2A32",
              opacity: general.link === selectedPage ? "1" : "0.6",
            }}
          >
            <SvgIcon>{general.imgIcon}</SvgIcon>
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
                {general.name}
              </Typography>
            )}
          </Button>
        </Link>
      ))}
      <Typography fontWeight={"bold"} variant="subtitle2" sx={{ ml: 2, mt: 2 }}>
        進階
      </Typography>
      <Divider
        variant="middle"
        sx={{
          mb: 1,
          backgroundColor: "#FFF",
        }}
      />
      {advanced.map((advanced) => (
        <Link key={advanced.link} to={`${advanced.link}`}>
          <Button
            variant="outlined"
            onClick={() => setSelectedPage(advanced.link)}
            size="large"
            sx={{
              px: 2,
              mb: 1,
              color: "#eeeeee",
              borderColor:
                advanced.link === selectedPage ? "grey[900]" : "#1B2A32",
              opacity: advanced.link === selectedPage ? "1" : "0.6",
            }}
          >
            <SvgIcon>{advanced.imgIcon}</SvgIcon>
            {sidebarCollapsed ? (
              ""
            ) : (
              <Typography
                fontWeight={"bold"}
                variant="subtitle1"
                sx={{ ml: 2, width: "70px", textAlign: "left" }}
              >
                {advanced.name}
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
                px: 2,
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
