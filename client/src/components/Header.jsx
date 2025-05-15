import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Header = () => {
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { label: "Blogs", path: "/blogs" },
    { label: "My Blogs", path: "/my-blogs" },
  ];

  const authButtons = isAuthenticated
    ? [{ label: "Logout", path: "/" }]
    : [
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
      ];

  return (
    <>
      <AppBar position="sticky" sx={{ background: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" fontWeight={600}>
            My Blog App
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={toggleDrawer}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
                <Box
                  width={250}
                  role="presentation"
                  onClick={toggleDrawer}
                  sx={{ padding: 2 }}
                >
                  <List>
                    {isAuthenticated &&
                      menuItems.map((item) => (
                        <ListItem
                          button
                          key={item.label}
                          component={Link}
                          to={item.path}
                        >
                          <ListItemText primary={item.label} />
                        </ListItem>
                      ))}
                    {authButtons.map((btn) => (
                      <ListItem key={btn.label}>
                        {btn.label === "Logout" ? (
                          <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            onClick={() => {
                              dispatch(logout());
                              navigate("/");
                            }}
                          >
                            {btn.label}
                          </Button>
                        ) : (
                          <Button
                            fullWidth
                            variant="outlined"
                            component={Link}
                            to={btn.path}
                          >
                            {btn.label}
                          </Button>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              {isAuthenticated && (
                <Tabs
                  value={value}
                  onChange={(e, newValue) => setValue(newValue)}
                  textColor="inherit"
                  indicatorColor="secondary"
                  sx={{ mx: "auto" }}
                >
                  {menuItems.map((item) => (
                    <Tab
                      key={item.label}
                      label={item.label}
                      component={Link}
                      to={item.path}
                    />
                  ))}
                </Tabs>
              )}
              <Box>
                {authButtons.map((btn) =>
                  btn.label === "Logout" ? (
                    <Button
                      key={btn.label}
                      sx={{ color: "white", mx: 1 }}
                      onClick={() => {
                        dispatch(logout());
                        navigate("/");
                      }}
                    >
                      {btn.label}
                    </Button>
                  ) : (
                    <Button
                      key={btn.label}
                      sx={{ color: "white", mx: 1 }}
                      component={Link}
                      to={btn.path}
                    >
                      {btn.label}
                    </Button>
                  )
                )}
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
