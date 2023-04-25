import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, ButtonGroup } from "@mui/material";

export function EmailVerification() {
  const param = useParams();
  const history = useNavigate();
  const [validUrl, setValidUrl] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/signup/users/${param.id}/verify/${param.token}`,
          { method: "GET" }
        );
        const data = await response.json();
        setValidUrl(true);
        setMessage(data.message);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyEmail();
  });

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="email-verify-form">
        <Card className="email-verify-card">
          {validUrl && message ? (
            <div>
              <Typography variant="h4" component="h2">
                {message}
              </Typography>

              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button onClick={() => history("/login")}>Sign in</Button>
              </ButtonGroup>
            </div>
          ) : (
            <h1>{message}</h1>
          )}
        </Card>
      </div>
    </ThemeProvider>
  );
}
