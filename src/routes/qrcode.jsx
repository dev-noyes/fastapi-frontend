import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import DownloadIcon from "@mui/icons-material/Download";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";

import MainListItems from "../dashboard/listItems";
import Copyright from "../components/copy-right";
import AppBar from "../components/app-bar";
import Drawer from "../components/side-drawer";

function Component() {
  const [value, setValue] = React.useState("");
  const [image, setImage] = React.useState("");

  const handleAPI = async () => {
    try {
      const res = await fetch(`https://fastapi-google-trend.up.railway.app/api/qrcode?name=${value}`);
      const json = await res.json();
      if (typeof json.result !== "undefined") {
        setImage(json.result);
        setValue("");
      } else {
        throw Error("404@API error");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const validation = () => {
    const regex = /^.{1,30}$/;
    return !regex.test(value);
  };
  const handleSearch = async () => {
    if (value === "") alert("Not working");
    else await handleAPI();
  };

  return (
    <Box
      id="div-qrcode"
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography component="h2" variant="h3" color="primary" gutterBottom sx={{ mb: 2, mt: 10 }}>
        QR code generator
      </Typography>
      <Typography component="h2" variant="h6" color="warning" gutterBottom>
        Input data should be between 1 character and 30 characters.
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          m: 1,
          width: "70vw",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          fullWidth
          error={validation()}
          value={value}
          onKeyDown={async(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              await handleAPI();
            }
          }}
          onChange={(e) => setValue(e.target.value)}
          margin="normal"
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch} onMouseDown={null} edge="end">
                  {value === "" ? <SearchOffIcon /> : <SearchIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {image ? (
          <>
            <img src={`data:image/png;base64,${image}`} alt="qrcode-base64" loading="lazy" style={{ width: "20vw", height: "20vw" }} />
            <a
              download={`qrcode-${value}-image.png`}
              href={`data:image/png;base64,${image}`}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              Download
              <DownloadIcon />
            </a>
          </>
        ) : null}
      </Box>
    </Box>
  );
}

const mdTheme = createTheme();
const COLOR = "#1d1d1b";

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} color="transparent">
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon sx={{ color: "#fff" }} />
            </IconButton>
            <Typography component="h1" variant="h6" color="#fff" noWrap sx={{ flexGrow: 1 }}>
              QRcode
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon sx={{ color: "#fff" }} />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} sx={{ bgcolor: COLOR }}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: "#000",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Component />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function QRcode() {
  return <DashboardContent />;
}
