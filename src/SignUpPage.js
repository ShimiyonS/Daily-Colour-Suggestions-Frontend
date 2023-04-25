import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, ButtonGroup, CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export function SignUpPage() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, SetResult] = useState("");
  const [error,setError ] = useState("");
  const [message, setMessage] = useState("");
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/api/signup", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setMessage(response.message);
      console.log(data);
      SetResult(data.message);
    } catch (error) {
      console.log(error);
      if (error.response.status >= 400 && error.response.status <= 500) {
        console.log(error);
      }
    }
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <div className="signup-page">
      <ThemeProvider theme={theme}>
        <div className="signup-form">
          <Card className="signup-card">
            <div className="left-form">
              <form onSubmit={handleSubmit}>
                <Typography variant="h4" component="h2">
                  Create Account
                </Typography>
                <CardContent>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <TextField
                      label="UserName"
                      variant="standard"
                      type="text"
                      placeholder="UserName"
                      name="username"
                      value={username}
                      onChange={(event) => setUserName(event.target.value)}
                      required
                    />

                    <br />
                    <TextField
                      label="Email"
                      variant="standard"
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                    <br />
                    <TextField
                      
                      label="Password"
                      variant="standard"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </FormControl>
                </CardContent>

                <br />

                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  <Button type="submit">Sign Up</Button>
                </ButtonGroup>

                <Typography variant="h6" component="h6">
                  {result && (
                    <div>
                      <p>{result}</p>
                    </div>
                  )}
                  {message && (
                    <div>
                      <p>{message}</p>
                    </div>
                  )}
                  {error && (
                    <div>
                      <p>{error}</p>
                    </div>
                  )}
                </Typography>
                <div></div>
              </form>
            </div>
          </Card>
          <Card>
            <div className="right-form">
              <Typography variant="h6" component="h2">
                Already have an account
              </Typography>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button onClick={() => history("/login")}>Click to Login Page</Button>
              </ButtonGroup>
            </div>
          </Card>
        </div>
      </ThemeProvider>
    </div>
  );
}
