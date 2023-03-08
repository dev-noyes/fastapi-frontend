import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import MainListItems from "../dashboard/listItems";
import Copyright from "../components/copyright";
import AppBar from "../components/app-bar";
import Drawer from "../components/drawer";

const COLOR = "#1d1d1b";

function Component() {
  const [query, setQuery] = React.useState("");
  const [trend, setTrend] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const validation = () => {
    const regex = /^.{1,30}$/;
    return !regex.test(query);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleAPI = async () => {
    try {
      setOpen(true);
      const res = await fetch(`https://fastapi-google-trend.up.railway.app/api/blogs?query=${query}`);
      const json = await res.json();
      if (json && json.length > 0) {
        const result = json.map((item, index) => {
          return { index: index + 1, link: item };
        });
        setTrend([...result]);
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
        검색어 최신글 이웃 블로그 링크
      </Typography>
      <Typography component="h2" variant="h6" color="warning" gutterBottom>
        원하시는 검색어를 입력하시고 검색 버튼을 누르면 검색어의 최신글을 쓴 이웃 블로그 링크가 나옵니다. (최대 200개)
      </Typography>
      <Typography component="h2" variant="h6" color="error" gutterBottom>
        자동화 프로그램은 위험하기 때문에 귀찮아도 직접하시는게 안전합니다.
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          margin="normal"
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleAPI} onMouseDown={null} edge="end">
                  {query === "" ? <SearchOffIcon /> : <SearchIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ my: 5 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple-table-trend">
          <TableHead sx={{ bgcolor: "#333" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Index</TableCell>
              <TableCell sx={{ color: "#fff" }}>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trend.map((row, index) => (
              <TableRow key={index} sx={{ border: 0 }}>
                <TableCell component="th" scope="row">
                  {row.index}
                </TableCell>
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
              Trend
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

export default function Blog() {
  return <DashboardContent />;
}
