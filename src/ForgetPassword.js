import { useState } from 'react';
import { Button, ButtonGroup, CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [error,setError] = useState("");
    const [msg,setMsg] = useState("");

    const handleSubmit = async (event)=>{
        event.preventDefault();
        try {
            const response = await fetch("https://damp-forest-76809.herokuapp.com/api/password-reset",
            {method:"POST",
            body:JSON.stringify({email}),
            headers:{
                "Content-Type": "application/json"
            }
        });
        const data =  await response.json(); 
        console.log(data); 
        setMsg(data.message);
        setError(""); 
        } catch (error) {
            if(
                error.response && 
                error.response.status >= 400 &&
                error.response.status <=500
            )
            console.log(error); 
            setError(error.response.data.message);
            setMsg("");
        }
    }

    const theme = createTheme({
        palette:{
          mode:'dark'
        },
      });

  return (
    <div className='forget-page'>
          <ThemeProvider theme ={theme}>

      <div className ="forget-form">
      <Card className="forget-card">
          <form onSubmit={handleSubmit}>
          <Typography variant="h4" component="h2">
            Forget Password
         </Typography>
         <CardContent >
         <FormControl fullWidth sx={{ m: 1 }} variant="standard">
         <TextField 
           id="standard-basic" 
           label="Email" 
            variant="standard"
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required />
         </FormControl>
         </CardContent>
         <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group">
          <Button type="submit">
            Submit
          </Button>
          </ButtonGroup>
              <div>
              <Typography variant="h6" component="h6"> 
              {error && <div>{error}</div>}
              {msg && <div>{msg}</div>}
              </Typography >
              </div>

          </form>
          </Card>
      </div>
      </ThemeProvider>
    </div>
  );
}
