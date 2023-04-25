import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Card from "@mui/material/Card";
import { Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import { Button, ButtonGroup, CardContent } from "@mui/material";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [, setError] = useState("");
  const history = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/api/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      localStorage.setItem("token", data.data);
      setResult(data.message);
      if (data.data) {
        history("/colorPage");
        return;
      } else {
        setResult("Invalid Email or Password");
      }

    } catch (error) {
      console.log(error.message);
      setError(error.message);

    }
  };
  const theme = createTheme({
    palette:{
      mode:'dark'
    },
  });
  return (
    <div className='login-page'>
       <ThemeProvider theme ={theme}>
      <div className='login-form'>
      <Card className="login-card">
        <div className='left-form'>
          <form onSubmit={handleSubmit}>
          <Typography variant="h4" component="h2">
            Welcome Back
         </Typography>
         <CardContent>
         <FormControl fullWidth sx={{ m: 1 }} variant="standard">
         <TextField 

            label="Email" 
            variant="standard"
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required />
            <br/>
           <TextField 
           id="standard-basic" 
           label="Password" 
            variant="standard"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required />
             </FormControl>
             </CardContent>
            <div>
              
            <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group">
          <Button type="submit">
            Sign in
          </Button>
          </ButtonGroup>
          <br/>
          <Typography variant="h6" component="h6">
          {result && <div>{result}</div>}
         </Typography>
              
            </div>
            </form>
        </div>
          </Card>
      
      <Card>
        <div className='right-form'>
          
          <Typography variant="h6" component="h2">
            New Here!
         </Typography>
         <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group">
              <Button onClick={()=>history("/signup")}>Sign up</Button>
              </ButtonGroup>  
        </div>
        <div>
          <Button onClick={()=>history("/forget-password")}>
              Forgot Password
          </Button>
        </div>
        </Card>
        </div>
      </ThemeProvider>
    </div>
  );
}
