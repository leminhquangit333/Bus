import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import logo from "../../assets/images/icon/admin.png";
import { LoginService } from "./LoginService";
import "./Login.scss"

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Liên hệ hỗ trợ © "}
      <Link color="inherit" href="https://www.facebook.com/leminhquangit">
        Lê Minh Quang
      </Link>{" "}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user = {
      userName: data.get("userName"),
      password: data.get("password"),
    };
    LoginService.login(user).then((res: any) => {
      if (!res.data || !res.data["token"]) {
        return;
      }
      const userInfo = {
        access_token: "leminhquangit"+res.data["token"].trim(),
        name: user.userName,
      };
      localStorage.setItem("web_auth", JSON.stringify(userInfo));
      window.location.reload();
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className="login">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          
        >
          <Avatar>
            <img src={logo} width="40" height="40" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng Nhập
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Tên Đăng Nhập"
              name="userName"
              autoComplete="userName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật Khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button type="submit" color="secondary" fullWidth className="button-submit">
              Đăng Nhập
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} style={{paddingTop: 12}} />
      </Container>
    </ThemeProvider>
  );
}
