import { Link } from "react-router-dom";

// material-ui
import { ButtonBase, Typography } from "@mui/material";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const returnToHome = () => {
    console.error("returnToHome");
  };
  return (
    <ButtonBase
      disableRipple
      onClick={() => returnToHome}
      component={Link}
      to="./supplier"
    >
      <CottageRoundedIcon sx={{ fontSize: 30, color: "#237A4E" }} />
      <Typography
        fontSize={"22px"}
        fontWeight={"bold"}
        letterSpacing={-1}
        gutterBottom
        color={"black"}
        sx={{ ml:0.5, mt: 1.5 }}
      >
        供應商管理
      </Typography>
    </ButtonBase>
  );
};

export default LogoSection;
