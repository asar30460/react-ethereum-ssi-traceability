import {
  Button,
  Container,
  Card,
  CardContent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";

const FunctionCard = ({
  cardHeader,
  cardContent,
  onClick,
  loading,
  isDIDFunction,
  readOnly,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: { xs: "auto", sm: "207px" },
        backgroundColor: "#223540",
        color: "#E0E0E0",
        borderRadius: 2,
        pb: 2,
      }}
    >
      <CardContent sx={{ minWidth: 150 }}>
        <Typography fontWeight="bold" variant="subtitle1" sx={{ mb: 2 }}>
          {cardHeader}
          {isDIDFunction ? (
            <Tooltip title="此函式與DID相關" sx={{ pl: -0.5 }}>
              <PersonPinIcon color="info" fontSize="small" />
            </Tooltip>
          ) : null}
        </Typography>
        <Stack direction="column" spacing={1} alignItems="flex-start">
          {cardContent}
        </Stack>
      </CardContent>
      <Container
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {readOnly ? (
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            disabled={loading}
            onClick={onClick}
            sx={{
              mr: -1,
              backgroundColor: "#1b2a32",
              color: "#E0E0E0",
              borderColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "#FFF",
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            查詢
          </Button>
        ) : (
          <Button
            variant="outlined"
            endIcon={<SendIcon />}
            disabled={loading}
            onClick={onClick}
            sx={{
              mr: -1,
              backgroundColor: "#1b2a32",
              color: "#E0E0E0",
              borderColor: "#D84315",
              "&:hover": {
                backgroundColor: "#D84315",
                color: "#FFF",
                borderColor: "#D84315",
              },
            }}
          >
            交易
          </Button>
        )}
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: "#FFF",
              position: "fixed",
              mt: 0.8,
              mr: 4,
            }}
          />
        )}
      </Container>
    </Card>
  );
};

export default FunctionCard;
