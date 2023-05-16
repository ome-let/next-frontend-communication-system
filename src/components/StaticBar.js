import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Logo from "./Logo";
import { useMediaQuery, createTheme } from "@mui/material";

function StaticBar() {
  const theme = createTheme(); // Create a theme object
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <AppBar
      position="static"
      style={{ background: "#FFFFFF", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href="/">{!isMobile && <Logo />} </a>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/" // Change to onclick to change state
            sx={{
              ml: 1,
              display: { xs: "none", md: "flex" },
              fontWeight: 600,
              //   fontFamily: "Helvetica Neue",
              letterSpacing: ".1rem",
              color: "#1570EF",
              textDecoration: "none",
            }}
          >
            OME-LETE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          <a href="/"> {isMobile && <Logo />} </a>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="" // Change to onclick to change state
            sx={{
              ml: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 600,
              //   fontFamily: "Helvetica Neue",
              letterSpacing: ".1rem",
              color: "#1570EF",
              textDecoration: "none",
            }}
          >
            OME-LETE
          </Typography>

          <Box sx={{ flexGrow: 0 }}></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default StaticBar;
