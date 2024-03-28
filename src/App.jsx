import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route element={<ProtectedRoute />}>
          {" "}
          {/* erisim icin sigin isteyen sayfalar ayri bir route alinir*/}
          <Route path="/home" element={<FeedPage />} />
          <Route path="/profile" element={<h1>Profile</h1>} />
          <Route path="/setting" element={<h1>Setting</h1>} />
          <Route path="/message" element={<h1>Messages</h1>} />
          <Route path="/mail" element={<h1>Email</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
