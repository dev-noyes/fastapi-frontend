import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { TypeAnimation } from "react-type-animation";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import YouTubeIcon from "@mui/icons-material/YouTube";

import MainListItems from "./listItems";

import Copyright from "../components/copyright";
import AppBar from "../components/app-bar";
import Drawer from "../components/drawer";
import BallCanvas from "../components/ball";
import YoutubeFollowers from "../components/youtube-count";
import Career from "../components/career";

const COLOR = "#1d1d1b";

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
              Dashboard
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
              bgcolor: COLOR,
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
          <List component="nav" sx={{ bgcolor: COLOR }}>
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
                <Box sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <TypeAnimation
                    sequence={[
                      "I'm a Youtuber", // Types 'Three' without deleting 'Two'
                      1000, // Waits 1s
                      "I'm a Frontend", // Types 'One'
                      1000, // Waits 1s
                      "I'm a Backend", // Deletes 'One' and types 'Two'
                      1000, // Waits 1s
                      "I'm a Designer", // Types 'Three' without deleting 'Two'
                      1000, // Waits 1s
                      () => {
                        console.log("Done typing!"); // Place optional callbacks anywhere in the array
                      },
                    ]}
                    wrapper="h1"
                    cursor={true}
                    repeat={Infinity}
                    style={{ fontSize: "5vw", color: "#fff" }}
                  />
                  <YoutubeFollowers />
                  <a href={"https://youtube.com/@yangdongjun"} target="_blank" style={{ marginBottom: "5vh", textDecoration: "none" }}>
                    <Button variant="contained" color="info" sx={{ backgroundColor: "red" }}>
                      Youtube
                    </Button>
                  </a>
                  <Typography color="#fefefe" variant="h6" sx={{ mb: 3 }}>
                    주로 사용하는 기술
                  </Typography>
                  <BallCanvas />
                  <Typography color="#fefefe" variant="h6" sx={{ mt: 10 }}>
                    전자책 - 크몽 입점
                  </Typography>
                  <Career />
                </Box>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
