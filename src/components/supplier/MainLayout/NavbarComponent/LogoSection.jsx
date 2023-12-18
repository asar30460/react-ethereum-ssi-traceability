import { Link } from "react-router-dom";

// material-ui
import { ButtonBase, Typography } from "@mui/material";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ setSelectedPage }) => {
  return (
    <ButtonBase
      disableRipple
      onClick={() => {
        setSelectedPage("");
      }}
      component={Link}
      to="."
      sx={{
        mr: 2,
        display: { xs: "none", md: "inline-flex" },
      }}
    >
      <CottageRoundedIcon sx={{ mr: 0.5, fontSize: 30, color: "#237A4E" }} />
      <Typography fontSize={"22px"} fontWeight={"bold"} letterSpacing={-1}>
        供應商管理
      </Typography>
    </ButtonBase>
  );
};

export default LogoSection;
