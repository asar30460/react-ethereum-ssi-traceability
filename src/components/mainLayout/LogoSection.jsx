import { Link } from "react-router-dom";

// material-ui
import { ButtonBase, SvgIcon } from "@mui/material";
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';

// project imports
import Manufacturer from "../../assets/manufacturer.svg";

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
      <CottageRoundedIcon color="success" sx={{ fontSize: 40 }}/>
    </ButtonBase>
  );
};

export default LogoSection;
