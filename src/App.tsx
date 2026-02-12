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
import { selectIsLoggedIn, selectToken } from "./redux/auth/selectors";
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
import Loader from "./components/Loader/Loader";
import AddWordForm from "./components/form/AddWordForm/AddWordForm";
import EditWordForm from "./components/form/EditWordForm/EditWord";
import NotFoundPage from "./page/NotFoundPage/NotFoundPage";

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
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);
  const type = useSelector(selectTypeModal);
  const editingWord = useSelector(selectPayload);

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (token && !isLoggedIn) {
      dispatch(refreshUser());
    }
  }, [dispatch, token, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchStatistics());
      dispatch(fetchCategories());
    } else {
      dispatch(resetState());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <Suspense fallback={<Loader className="fallbackLoader" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
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
          <Route path="*" element={<NotFoundPage />} />
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
            type === "editWord" && editingWord ? (
              <EditWordForm
                className="form"
                editingWord={editingWord}
                onClose={handleClose}
              />
            ) : (
              <AddWordForm className="form" onClose={handleClose} />
            )
          }
        />
      )}
    </>
  );
}

export default App;
