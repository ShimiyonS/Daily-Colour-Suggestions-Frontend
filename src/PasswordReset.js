import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Card from "@mui/material/Card";
import { Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import { Button, ButtonGroup, CardContent } from "@mui/material";


export function PasswordReset() {
    const history = useNavigate(); 
    const [validUrl, setValidUrl]= useState(false); 
    const [mes,setMes] = useState("");
    const [error,setError] = useState("");
    const [password, setPassword] = useState("");
    const param = useParams(); 
    const url = `https://damp-forest-76809.herokuapp.com/api/password-reset/${param.id}/${param.token}`

    //Getting the password reset page method :
    useEffect(()=>{
        const resetPage = async ()=>{
            try {
                const response = await fetch(url,{
                    method:"GET"
                });
                const data = await response.json(); 
                setValidUrl(true); 
                setMes(data.message); 

            } catch (error) {
                console.log(error); 
                setValidUrl(false);
            }
        }
        resetPage();

    }, [param,url])

  const handleSubmit = async(event) => {
      event.preventDefault(); 
     try {
         const res = await fetch(url,{
             method:"POST",
             body:JSON.stringify({password}),
             headers:{
                 "Content-Type":"application/json"
             }
         });
         const result = await res.json(); 
         setMes(result.message); 
         
         
     } catch (error) {
         console.log(error); 
        if(
            error.response && 
            error.response.status >= 400 &&
            error.response.status <=500
        )
        console.log(error); 
        setError(error.response.data.message);
        setMes("");
     }
  }

  const theme = createTheme({
    palette:{
      mode:'dark'
    },
  });

  return (
    <ThemeProvider theme ={theme}>  
    <div className="reset-form">
        <Card>
        {validUrl ?

        <div>
      <form onSubmit={handleSubmit}>
      <Typography variant="h4" component="h2">
          {mes}
         </Typography>
            
         <Typography variant="h4" component="h2">
             Password Reset Page
             </Typography>
             <CardContent>
         <FormControl fullWidth sx={{ m: 1 }} variant="standard">
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

           <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group">
          <Button type="submit">
            Submit
          </Button>
          </ButtonGroup>
      </form>
      <br/>
      <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group">
          <Button onClick={() => history.push("/login")}>
            login
          </Button>
          </ButtonGroup>

         
      </div>
       :
       <div>
        <Typography variant="h4" component="h2">{error}</Typography>
       </div>
    }
    </Card>
    </div>
    </ThemeProvider>
  );
}
