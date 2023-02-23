import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Resizer from "react-image-file-resizer";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import MainListItems from "../dashboard/listItems";
import Copyright from "../components/Copyright";
import AppBar from "../components/Appbar";
import Drawer from "../components/Drawer";

const COLOR = "#1d1d1b";

function Component() {
  const [data, setData] = React.useState(null);
  const [file, setFile] = React.useState(null);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const image = await resizeFile(file);
    const res = await fetch(image);
    const blob = await res.blob();
    setFile(blob);
    setData(null);
  };

  const handleAPI = async (event) => {
    try {
      event.preventDefault();
      setData(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`https://fastapi-google-trend.up.railway.app/api/color_palette?n=5`, {
        method: "POST",
        headers: {
          //"Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const json = await res.json();
      if (typeof json.color_palette === "object") {
        setData(json.color_palette);
      } else {
        throw Error("404@API error");
      }
    } catch (err) {
      console.error(err);
    }
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
        Image Color Extracter
      </Typography>
      <Typography component="h2" variant="h6" color="warning" gutterBottom>
        Get the color palette in image.
      </Typography>
      <Box component="div" sx={{ my: 5 }}>
        <InputLabel>Choose an image</InputLabel>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1,
            bgcolor: "#fff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "0.5rem",
          }}
        >
          <Input type="file" id="fileInput" accept="image/*" sx={{ display: "contents" }} onChange={handleFileChange} />

          {file ? (
            <IconButton component="span" sx={{ mr: 1 }} onClick={handleAPI}>
              <CloudUploadIcon sx={{ fontSize: "1.5rem", color: "#6c757d" }} />
            </IconButton>
          ) : null}
        </Box>
      </Box>
      <Box>{file ? <img style={{ maxWidth: "50vw" }} src={URL.createObjectURL(file)} alt="Selected file" /> : null}</Box>
      <Box component="div" sx={{ display: "flex", my: 5 }}>
        {data &&
          data.map((item, index) => {
            return (
              <Box
                key={index}
                component={"div"}
                sx={{ display: "flex", width: "10vw", height: "10vw", backgroundColor: item, alignItems: "center", justifyContent: "center" }}
              >
                <Typography color={"white"}>{item}</Typography>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}

const mdTheme = createTheme();

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
              Image Palette
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
              <ChevronLeftIcon sx={{ color: "#fff" }}/>
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

export default function ImageColorPalette() {
  return <DashboardContent />;
}
