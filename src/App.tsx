import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout/AuthLayout";
import AppLayout from "./components/layouts/AppLayout/AppLayout";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch } from "./redux/store";
import { fetchStatistics } from "./redux/userDictionary/operations";
import { refreshUser } from "./redux/auth/operations";
import { fetchCategories } from "./redux/filters/operations";
import { selectIsRefreshing, selectUser } from "./redux/auth/selectors";
import { resetState } from "./redux/userDictionary/slice";
import { closeModal } from "./redux/modal/slice";
import {
  selectIsOpen,
  selectPayload,
  selectTypeModal,
} from "./redux/modal/selector";
import Modal from "./components/Modal/Modal";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import HomePage from "./page/HomePage/HomePage";
import ModalContent from "./components/Modal/ModalContent/ModalContent";

const DictionaryPage = lazy(
  () => import("./page/DictionaryPage/DictionaryPage"),
);
const RecommendPage = lazy(() => import("./page/RecommendPage/RecommendPage"));
const TrainingPage = lazy(() => import("./page/TrainingPage/TrainingPage"));
const LoginPage = lazy(() => import("./page/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./page/RegisterPage/RegisterPage"));

function App() {
  const isOpen = useSelector(selectIsOpen);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const isRefreshing = useSelector(selectIsRefreshing);
  const type = useSelector(selectTypeModal);
  const editingWord = useSelector(selectPayload);
  console.log("🚀 ~ App ~ type:", type);

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchStatistics());
      dispatch(fetchCategories());
    } else {
      dispatch(resetState());
    }
  }, [dispatch, user]);

  if (isRefreshing) {
    return <p>Refreshing</p>;
  }

  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<PublicRoute />}>
            <Route element={<AuthLayout className="headerAuth" />}>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout className="header" />}>
              <Route path="/dictionary" element={<DictionaryPage />} />
              <Route path="/recommend" element={<RecommendPage />} />
              <Route path="/training" element={<TrainingPage />} />
            </Route>
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
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          children={
            <ModalContent
              type={type}
              editingWord={editingWord}
              onClose={handleClose}
              className="form"
            />
          }
        />
      )}
    </>
  );
}

export default App;
