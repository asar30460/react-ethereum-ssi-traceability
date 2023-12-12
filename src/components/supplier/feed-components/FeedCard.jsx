import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const FeedCard = ({ Header, chHeader, value }) => {
  const RoundGradientBox = styled(Box)(({}) => ({
    position: "relative",
    backgroundColor: "#1b2a32",
    border: "5px solid transparent",
    borderRadius: 5,
    backgroundClip: "padding-box",

    "&:after": {
      position: "absolute",
      top: -5,
      left: -5,
      right: -5,
      bottom: -5,
      background:
        "linear-gradient(135deg, rgba(23,127,128,1) 0%, rgba(35,60,177,1) 100%)",
      content: '""',
      zIndex: -1,
      borderRadius: 5,
    },
  }));

  return (
    <RoundGradientBox
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "3px solid transparent",
        color: "#E0E0E0",
        p: 2,
      }}
    >
      <Typography fontWeight="bold" variant="subtitle1" align="center">
        {chHeader}
      </Typography>
      <Typography variant="body2" align="center" sx={{ minHeight: "40px" }}>
        {Header}
      </Typography>
      <Typography fontWeight="bold" variant="h5" align="center" sx={{ mt: 1 }}>
        {value}
      </Typography>
    </RoundGradientBox>
  );
};

export default FeedCard;
