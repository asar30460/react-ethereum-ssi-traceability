import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import WindowIcon from "@mui/icons-material/Window";

export const navlinks = {
  general: [
    {
      name: "動態",
      imgIcon: <FormatAlignLeftIcon />,
      link: "",
    },
  ],

  advanced: [
    {
      name: "SSI 設置",
      imgIcon: <SwitchAccountIcon />,
      link: "ssi-management",
    },
    {
      name: "專案",
      imgIcon: <WindowIcon />,
      link: "project",
      disabled: true,
    },
  ],
};
