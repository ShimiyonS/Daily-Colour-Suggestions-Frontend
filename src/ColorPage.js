import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import Card from "@mui/material/Card";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export function ColorPage() {
  const history = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("");
  const [mes, setMes] = useState("");
  const [error, setError] = useState("");
  const [daily, setDaily] = useState("");

  // useEffect(()=>{
  //   if(!acces){
  //     history.push("/login")
  //   }
  // },[acces])

  useEffect(() => {
    const getColors = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/color-app?type=${selectedValue}`,
          {
            method: "GET",
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setColor(data.data);
        setMes(data.message);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };
    getColors();
  }, [selectedValue]);

  const handleClick = async (event) => {
    event.preventDefault();
    const max = color.length;
    const num = Math.floor(Math.random() * max);
    setDaily(color[num]);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    try {
      localStorage.removeItem("token");
      history("/");
    } catch (error) {
      console.log(error);
    }
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <div>
      <div className="color-page">
        <ThemeProvider theme={theme}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Welcome
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
          <div style={{ padding: "2%" }}>
            <h2>Select Your Skin Type</h2>
          </div>
          <div>
            <Radio
              checked={selectedValue === "warm"}
              onClick={(event) => setSelectedValue(event.target.value)}
              value="warm"
              name="radio-buttons"
            />
            Warm 🔥
            <Radio
              checked={selectedValue === "cool"}
              onClick={(event) => setSelectedValue(event.target.value)}
              value="cool"
              name="radio-buttons"
            />
            Cool 🍨
          </div>
          <div>
            <h3 style={{ padding: "2%" }}>
              Confused of selecting your skin type? <i>click show details</i>
            </h3>
            {!show ? (
              <Button color="inherit" onClick={() => setShow(!show)}>
                Show Details
                <VisibilityIcon />
              </Button>
            ) : (
              <Button color="inherit" onClick={() => setShow(!show)}>
                Hide details <VisibilityOffIcon />
              </Button>
            )}
            <br /> <br />
            {show ? (
              <div className="details-page">
                <Card>
                  <h3>
                    <b>The Wrist Test</b>
                  </h3>
                  <p>
                    Look at the underside of your wrists and closely examine the
                    color of your veins.
                    <br />
                    <b>Cool</b> : If your veins look purple or blue, then you
                    have a cool undertone.
                    <br />
                    <b>Warm</b> : If your veins appear greenish or olive veins,
                    you have a warm undertone.
                  </p>
                  <br />
                  <h3>
                    <b>The Jewellery Test</b>
                  </h3>
                  <p>
                    Take a piece of each of silver and gold jewellery and place
                    it next to your skin..
                    <br />
                    <b>Cool</b> : You have cool skin if silver jewellery tends
                    to look flattering on your skin
                    <br />
                    <b>Warm</b> : You are more likely to have a warm tone if
                    gold looks good on your skin.
                  </p>
                  <br />
                </Card>
              </div>
            ) : (
              ""
            )}
            <div>
              {mes && (
                <div>
                  <h3>{mes}</h3>
                </div>
              )}
              {error && (
                <div>
                  <h3>{error}</h3>
                </div>
              )}
            </div>
          </div>
          <div>{!mes && !error ? <h2>Colors for your Skintone</h2> : ""}</div>{" "}
          <br />
          <div className="color-box">
            {color &&
              color?.map((item) => (
                <div
                  style={{ backgroundColor: `${item}` }}
                  className="color-items"
                >
                  {item}
                </div>
              ))}
          </div>
          <div>
            <br />
            {!mes && !error ? (
              <div>
                <h2>Want us to choose a color for the day?</h2>
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={handleClick}
                >
                  Get Color
                </Button>
                <br /> <br />
                <div
                  style={{ backgroundColor: `${daily}` }}
                  className="day-color"
                >
                  {daily}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}
