import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

export const SidebarObject = [
  {
    name: "dashboard",
    icon: <SpaceDashboardIcon />,
    link: "/",
  },
  {
    name: "ssi_management",
    icon: <AccountCircleIcon />,
    link: "/ssi-management",
  },
  {
    name: "projects",
    icon: <ViewModuleIcon />,
    link: "/projects",
    disabled: true,
  },
];
