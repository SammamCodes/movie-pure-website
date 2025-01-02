import { Paper, Stack, Button, Box, Typography, IconButton } from '@mui/material';
import React from 'react';
import Container from './Container';
import Logo from './Logo';
import menuConfigs from "../../configs/menu.configs";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Email } from '@mui/icons-material';



const Footer = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem" }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row " }}
          sx={{ height: "max-content" }}
        >
          <Logo />
          <Box>
            {menuConfigs.main.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "inherit" }}
                component={Link}
                to={item.path}
              >
                {item.display}
              </Button>
            ))}
          </Box>
          <IconButton component="a" href="https://facebook.com" target="_blank" aria-label="Facebook">
              <Facebook/>
              </IconButton>
              <IconButton component="a" href="https://twitter.com" target="_blank" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton component="a" href="https://instagram.com" target="_blank" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton component="a" href="mailto:support@yourwebsite.com" aria-label="Email">
                <Email />
              </IconButton>
        </Stack>
        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: "2rem", color: "text.secondary" }}
        >
          &copy; {new Date().getFullYear()} YourWebsiteName. All rights reserved.
        </Typography>
        <Link to="notFound">
        <Button>
         Not Found
        </Button>
        </Link>
      </Paper>
    </Container>
  );
};

export default Footer;