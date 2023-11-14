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
      width={sidebarCollapsed ? "75px" : "180px"}
      sx={{
        position: "sticky",
        height: "92vh",
        padding: "5px",
        border: "5px solid #1B2A32",
      }}
    >
      <Typography fontWeight={"bold"} variant="subtitle2" sx={{ ml: 2 }}>
        一般
      </Typography>
      <Divider variant="middle" sx={{ backgroundColor: "#FFF", mb: 1 }} />
      {general.map((general) => (
        <Link key={general.link} to={`${general.link}`}>
          <Button
            variant="outlined"
            onClick={() => setSelectedPage(general.link)}
            size="large"
            sx={{
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
      <Typography fontWeight={"bold"} variant="subtitle2" sx={{ mt: 2, ml: 2 }}>
        進階
      </Typography>
      <Divider variant="middle" sx={{ backgroundColor: "#FFF", mb: 1 }} />
      {advanced.map((advanced) => (
        <Link key={advanced.link} to={`${advanced.link}`}>
          <Button
            variant="outlined"
            onClick={() => setSelectedPage(advanced.link)}
            size="large"
            sx={{
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
                mb: 1,
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
