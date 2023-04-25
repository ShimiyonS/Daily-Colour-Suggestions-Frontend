import { Route, Routes } from "react-router-dom";
import './App.css';
import { SignUpPage } from "./SignUpPage";
import { LoginPage } from "./LoginPage";
import { EmailVerification } from "./EmailVerification";
import { ForgetPassword } from "./ForgetPassword";
import { PasswordReset } from "./PasswordReset";
import { ColorPage } from "./ColorPage";
import { HomePage } from "./HomePage";
import { Nopage } from "./Nopage";

function App() {
  return (
    <div className="App">
      <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/colorPage" element={<ColorPage/>}/>
        <Route path="/users/:id/verify/:token" element={<EmailVerification/>}/>
        <Route path="/forget-password" element={<ForgetPassword/>}/>
        <Route path="/api/password-reset/:id/:token" element={<PasswordReset/>}/>
        <Route path ="*" element={<Nopage/>}/>
      </Routes>
   </div>
    </div>

  );
}

export default App;
