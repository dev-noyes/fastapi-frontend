import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

import Box from "@mui/material/Box";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
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

import MainListItems from "../dashboard/listItems";
import Copyright from "../components/copy-right";
import AppBar from "../components/app-bar";
import Drawer from "../components/side-drawer";

const COLOR = "#1d1d1b";

function Component() {
  const MemoEditor = () => {
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
    const editor = React.useRef(null);

    React.useEffect(() => {
      editor.current.focus();
    }, []);

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

    const myBlockStyleFn = (contentBlock) => {
      const type = contentBlock.getType();
      if (type === "blockquote") {
        return "superFancyBlockquote";
      }
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
          <Editor
            placeholder="Hello"
            blockStyleFn={myBlockStyleFn}
            ref={editor}
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={React.useCallback(
              (rawcontent) => {
                setEditorState(rawcontent);
              },
              [editorState]
            )}
          />
        </Box>
      </div>
    );
  };

  return <MemoEditor />;
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
              Online Memo
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

export default function Memo() {
  return <DashboardContent />;
}
