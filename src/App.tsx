import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout/AuthLayout";
import AppLayout from "./components/layouts/AppLayout/AppLayout";
import { Toaster } from "react-hot-toast";

const DictionaryPage = lazy(
  () => import("./page/DictionaryPage/DictionaryPage")
);
const RecommendPage = lazy(() => import("./page/RecommendPage/RecommendPage"));
const TrainingPage = lazy(() => import("./page/TrainingPage/TrainingPage"));
const LoginPage = lazy(() => import("./page/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./page/RegisterPage/RegisterPage"));

function App() {
  return (
    <>
      <Suspense>
        <Routes>
          <Route element={<AuthLayout className="headerAuth" />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<AppLayout className="header" />}>
            <Route path="/dictionary" element={<DictionaryPage />} />
            <Route path="/recommend" element={<RecommendPage />} />
            <Route path="/training" element={<TrainingPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toasterId="default"
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
}

export default App;
