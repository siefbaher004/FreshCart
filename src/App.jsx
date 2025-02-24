import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import Notfound from "./components/Notfound/Notfound";
import Brands from "./components/Brands/Brands";
import Catagories from "./components/Catagories/Catagories";
import Login from "./components/Login/Login";
import Products from "./components/Products/Products";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import AllProductsAPIcallProvider from "./Context/AllProductsAPIcall";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import BrandDetails from "./components/BrandDetails/BrandDetails";
import CartContextProvider from "./Context/cartContext";
import { Toaster } from "react-hot-toast";
import WhishList from "./components/WhishList/WhishList";
import WhishListContextProvider from "./Context/WhishListContext";
import Payment from "./components/Payment/Payment";
import AllOrders from "./components/AllOrders/AllOrders";
import AllOrdersContextProvider from "./Context/AllOrdersContext";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import PasswordContextProvider from "./Context/PasswordContext";
import VerifyResetCode from "./components/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";

const query = new QueryClient();
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "whishlist",
        element: (
          <ProtectedRoute>
            <WhishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "brandDetails/:id",
        element: (
          <ProtectedRoute>
            <BrandDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "catagories",
        element: (
          <ProtectedRoute>
            <Catagories />
          </ProtectedRoute>
        ),
      },
      {
        path: "CategoryDetails/:id",
        element: (
          <ProtectedRoute>
            <CategoryDetails />
          </ProtectedRoute>
        ),
      },

      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "verifyresetcode", element: <VerifyResetCode /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <AllProductsAPIcallProvider>
          <QueryClientProvider client={query}>
            <ReactQueryDevtools />
            <CartContextProvider>
              <WhishListContextProvider>
                <AllOrdersContextProvider>
                  <PasswordContextProvider>
                    <Toaster />
                    <RouterProvider router={router}></RouterProvider>
                  </PasswordContextProvider>
                </AllOrdersContextProvider>
              </WhishListContextProvider>
            </CartContextProvider>
          </QueryClientProvider>
        </AllProductsAPIcallProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
