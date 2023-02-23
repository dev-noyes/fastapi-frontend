import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BarChartIcon from "@mui/icons-material/BarChart";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CommentIcon from "@mui/icons-material/Comment";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function MainListItems() {
  const navigate = useNavigate();
  const style = { color: "#fff" };
  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate("/")}>
        <ListItemIcon>
          <HomeIcon sx={style} />
        </ListItemIcon>
        <ListItemText primary="Home" sx={style} />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/qrcode")}>
        <ListItemIcon>
          <QrCodeIcon sx={style} />
        </ListItemIcon>
        <ListItemText primary="QRcode" sx={style} />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/color")}>
        <ListItemIcon>
          <ColorLensIcon sx={style} />
        </ListItemIcon>
        <ListItemText primary="Color" sx={style} />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/google-trend")}>
        <ListItemIcon>
          <TrendingUpIcon sx={style} />
        </ListItemIcon>
        <ListItemText primary="Trends" sx={style} />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/youtube-comment")}>
        <ListItemIcon>
          <CommentIcon sx={style} />
        </ListItemIcon>
        <ListItemText primary="Comment" sx={style} />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/youtube-popular")}>
        <ListItemIcon>
          <OndemandVideoIcon sx={style} />
        </ListItemIcon>
        <ListItemText primary="Popular" sx={style} />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/youtube-analysis")}>
        <ListItemIcon>
          <BarChartIcon sx={style} />
        </ListItemIcon>
        <ListItemText primary="Analysis" sx={style} />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/color_palette")}>
        <ListItemIcon>
          <InvertColorsIcon sx={style} />
        </ListItemIcon>
        <ListItemText primary="Image color" sx={style} />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/memo")}>
        <ListItemIcon>
          <DriveFileRenameOutlineIcon sx={style} />
        </ListItemIcon>
        <ListItemText primary="Online Memo" sx={style} />
      </ListItemButton>
    </React.Fragment>
  );
}
