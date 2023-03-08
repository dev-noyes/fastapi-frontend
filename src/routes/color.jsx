import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";

import MainListItems from "../dashboard/listItems";
import Copyright from "../components/copyright";
import AppBar from "../components/app-bar";
import Drawer from "../components/drawer";

const COLOR = "#1d1d1b";

function Component() {
  const [color, setColor] = React.useState([]);
  const [number, setNumber] = React.useState(5);

  const handleAPI = async () => {
    try {
      const res = await fetch(`https://fastapi-google-trend.up.railway.app/api/color?n=${number}`);
      const json = await res.json();
      if (typeof json.result !== "undefined") {
        setColor(json.result);
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
        Color Palette
      </Typography>
      <Typography component="h2" variant="h6" color="warning" gutterBottom>
        You can get 5 color recommendation.
      </Typography>
      <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ my: 2 }}>
        <Button disabled={number === 1 ? true : false} onClick={() => setNumber(1)}>
          1개
        </Button>
        <Button disabled={number === 3 ? true : false} onClick={() => setNumber(3)}>
          3개
        </Button>
        <Button disabled={number === 5 ? true : false} onClick={() => setNumber(5)}>
          5개
        </Button>
        <Button disabled={number === 7 ? true : false} onClick={() => setNumber(7)}>
          7개
        </Button>
      </ButtonGroup>
      <Button variant="contained" onClick={handleAPI} sx={{ mt: 3 }}>
        Get color
      </Button>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "row",
          my: 5,
          alignItems: "center",
          justifyItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        {color &&
          color.map((item, index) => {
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
              Color
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

export default function Color() {
  return <DashboardContent />;
}
