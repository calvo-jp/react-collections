import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import image1 from "assets/images/pexels/1.jpg";
import image2 from "assets/images/pexels/2.jpg";
import image3 from "assets/images/pexels/3.jpg";
import image4 from "assets/images/pexels/4.jpg";
import image5 from "assets/images/pexels/5.jpg";
import image6 from "assets/images/pexels/6.jpg";
import image7 from "assets/images/pexels/7.jpg";
import image8 from "assets/images/pexels/8.jpg";
import image9 from "assets/images/pexels/9.jpg";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const Landing = () => {
  const trigger = useScrollTrigger();

  return (
    <React.Fragment>
      <Head>
        <title>Official website of Barangay Fabrica, Sagay City</title>
      </Head>

      <Box minHeight="100vh">
        <Slide appear={false} direction="down" in={!trigger}>
          <AppBar color="default">
            <Toolbar variant="dense">
              <Typography>Barangay Fabrica</Typography>

              <Box flexGrow={1} />

              <Link passHref href="/login">
                <Button variant="outlined" color="primary">
                  Login
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Slide>

        <Box height={400} position="relative">
          <Toolbar variant="dense" />

          <Image
            src={image5}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </Box>

        <Box component="main" p={4} maxWidth={900} marginX="auto">
          <Grid container spacing={2}>
            {[
              image1,
              image2,
              image3,
              image4,
              image5,
              image6,
              image7,
              image8,
              image9,
            ].map((src, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4} xl={3}>
                <Box position="relative" height={250}>
                  <Image
                    src={src}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          component="footer"
          padding={2}
          display="flex"
          flexDirection="column"
          justifyItems="center"
          alignItems="center"
          gap={1}
        >
          <Stack direction="row" spacing={1}>
            <InstagramIcon />
            <FacebookIcon />
            <TwitterIcon />
          </Stack>

          <Typography variant="body2">
            &copy; Barangay Fabrica {currentYear}
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};

const currentYear = new Date().getFullYear();

export default Landing;
