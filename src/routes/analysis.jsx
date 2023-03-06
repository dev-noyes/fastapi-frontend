import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
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
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import MainListItems from "../dashboard/listItems";
import Copyright from "../components/Copyright";
import AppBar from "../components/Appbar";
import Drawer from "../components/Drawer";

const COLOR = "#1d1d1b";

function Component() {
  const [region, setRegion] = React.useState("US");
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const validation = () => {
    const regex = /^.{1,30}$/;
    return !regex.test(value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleSearch = () => {
    if (value === "") alert("Not working");
    else handleAPI();
  };
  const handleAPI = async () => {
    try {
      setOpen(true);
      const res = await fetch(`https://fastapi-google-trend.up.railway.app/api/youtube_analysis?topic=${value}&region=${region}`);
      const json = await res.json();
      if (typeof json.result === "undefined") {
        console.log(json);
        setData(json);
      } else {
        throw Error("404@API error");
      }
    } catch (err) {
      console.error(err);
    }
    finally{
      setOpen(false);
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
        Youtube data analysis
      </Typography>
      <Typography component="h2" variant="h6" color="warning" gutterBottom>
        You can get which video is good to refer
      </Typography>
      <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ my: 2 }}>
        <Button disabled={region === "US" ? true : false} onClick={() => setRegion("US")}>
          America
        </Button>
        <Button disabled={region === "KR" ? true : false} onClick={() => setRegion("KR")}>
          Korea
        </Button>
        <Button disabled={region === "JP" ? true : false} onClick={() => setRegion("JP")}>
          Japan
        </Button>
      </ButtonGroup>
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
        <TableContainer component={Paper} sx={{ my: 5 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple-table-trend">
            <TableHead sx={{ bgcolor: "#333" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Index</TableCell>
                <TableCell sx={{ color: "#fff" }}>Title</TableCell>
                <TableCell sx={{ color: "#fff" }}>ChannelTitle</TableCell>
                <TableCell sx={{ color: "#fff" }}>Subscribers</TableCell>
                <TableCell sx={{ color: "#fff" }}>ViewCount</TableCell>
                <TableCell sx={{ color: "#fff" }}>Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index} sx={{ border: 0 }}>
                  <TableCell component="th" scope="row">
                    {index+1}
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.channel_title}</TableCell>
                  <TableCell>{row.subscribers}</TableCell>
                  <TableCell>{row.view_count}</TableCell>
                  <TableCell>
                    <a href={row.link} target="_blank">
                      {row.link}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
              Analysis
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

export default function Analysis() {
  return <DashboardContent />;
}
