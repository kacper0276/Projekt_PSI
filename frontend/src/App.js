import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import Layout from "./Layout/Layout";
import MainPage from "./Pages/MainPage/MainPage";
import ForgotPasswordPage from "./Pages/ForgotPassword/ForgotPasswordPage/ForgotPasswordPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import Navigation from "./Layout/UI/Navigation/Navigation";
import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import MainContext from "./context/MainContext";

export const API_URL = "http://localhost:8080";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const header = (
    <Header>
      <Routes>
        <Route path="/zaloguj" exact element={<></>} />
        <Route path="/rejestracja" exact element={<></>} />
        <Route path="/zmiana/:username" exact element={<></>} />
        <Route path="*" element={<Navigation />} />
      </Routes>
    </Header>
  );

  const content = (
    <>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/zaloguj" exact element={<LoginPage />} />
        <Route path="/rejestracja" exact element={<RegisterPage />} />
        <Route
          path="/zmiana/:username"
          exact
          element={<ForgotPasswordPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );

  const footer = <Footer />;

  return (
    <MainContext.Provider
      value={{
        dispatch: dispatch,
        state: state,
      }}
    >
      <Router>
        <Layout header={header} content={content} footer={footer} />
      </Router>
    </MainContext.Provider>
  );
}

export default App;
