import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
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
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import CodeIcon from "@mui/icons-material/Code";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import FormatClearIcon from '@mui/icons-material/FormatClear';

import MainListItems from "../dashboard/listItems";
import { display } from "@mui/system";

function Component() {
  const MemoEditor = () => {
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
    const onUtilType = (type) => {
      // type BOLD ITALIC UNDERLINE
      setEditorState(RichUtils.toggleInlineStyle(editorState, type));
    };
    const onUtilBlock = (type) => {
      // type OL UL
      setEditorState(RichUtils.toggleBlockType(editorState, type));
    };
    const styleMap = {
      STRIKETHROUGH: {
        textDecoration: "line-through",
      },
      HIGHLIGHT: {
        display: "inline",
        boxShadow: "inset 0 -0.5vw 0 #f5cac3",
      },
    };

    return (
      <div
        id="div-memo"
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
        <div style={{ display: "flex", justifyItems: "center", alignItems: "center" }}>
          <IconButton onClick={() => onUtilType("BOLD")}>
            <FormatBoldIcon />
          </IconButton>
          <IconButton onClick={() => onUtilType("ITALIC")}>
            <FormatItalicIcon />
          </IconButton>
          <IconButton onClick={() => onUtilType("UNDERLINE")}>
            <FormatUnderlinedIcon />
          </IconButton>
          <IconButton onClick={() => onUtilType("STRIKETHROUGH")}>
            <FormatStrikethroughIcon />
          </IconButton>
          <IconButton onClick={() => onUtilType("HIGHLIGHT")}>
            <BorderColorIcon />
          </IconButton>
          <IconButton onClick={() => onUtilBlock("unordered-list-item")}>
            <FormatListBulletedIcon />
          </IconButton>
          <IconButton onClick={() => onUtilBlock("ordered-list-item")}>
            <FormatListNumberedIcon />
          </IconButton>
          <IconButton onClick={() => onUtilBlock("header-one")}>
            <Typography>H1</Typography>
          </IconButton>
          <IconButton onClick={() => onUtilBlock("header-two")}>
            <Typography>H2</Typography>
          </IconButton>
          <IconButton onClick={() => onUtilBlock("header-three")}>
            <Typography>H3</Typography>
          </IconButton>
          <IconButton onClick={() => onUtilBlock("header-four")}>
            <Typography>H4</Typography>
          </IconButton>
          <IconButton onClick={() => onUtilBlock("header-five")}>
            <Typography>H5</Typography>
          </IconButton>
          <IconButton onClick={() => onUtilBlock("header-six")}>
            <Typography>H6</Typography>
          </IconButton>
          <IconButton onClick={() => onUtilBlock("unstyled")}>
            <LayersClearIcon />
          </IconButton>
          <IconButton onClick={() => onUtilType("CODE")}>
            <CodeIcon />
          </IconButton>
        </div>
        <Box
          component="div"
          sx={{
            minHeight: "30vw",
            borderWidth: 1,
            borderColor: "#333",
            backgroundColor: "#fefae0",
            borderRadius: 2,
            p: 2,
            my: 2,
          }}
        >
          <Editor customStyleMap={styleMap} editorState={editorState} onChange={setEditorState} />
        </Box>
      </div>
    );
  };

  return <MemoEditor />;

  return {
    /* <Box
      id="div-memo"
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
        Online Memo
      </Typography>
      <Typography component="h2" variant="h6" color="warning" gutterBottom>
        You can write any memos and copy it for free
      </Typography>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
          bgcolor: "#3333",
        }}
      >
        <MemoEditor />
      </Box>
    </Box> */
  };
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        DongjunYang
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

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
        <AppBar position="absolute" open={open}>
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
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
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
            backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
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

export default function Memo() {
  return <DashboardContent />;
}
