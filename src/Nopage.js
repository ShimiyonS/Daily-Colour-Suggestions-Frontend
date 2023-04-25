import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

export function Nopage() {
  const history = useNavigate();
  return(
  <div className="no-page">
    <img src=" https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?size=626&ext=jpg" alt="404" />
    <h2>No Access please login</h2>
    <Button variant="contained"
      color="warning"
      onClick={() => history.push("/")}>Home
    </Button>
  </div>
  )
}
