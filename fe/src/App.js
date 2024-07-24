import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./layout/LandingPage/LandingPage";
import Login from "./layout/Auth/Login";
import SignUp from "./layout/Auth/SignUp";
import Cart from "./layout/Cart/Cart";
import ProductListNKC from "./layout/Product/ProductListNKC";
import ProductDetail from "./layout/Product/ProductDetail";
import Checkout from "./layout/Checkout/Checkout";
import LoginEmp from "./layout/Dashboard/Auth/LoginEmp";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./layout/Dashboard/DashBoard";
import EmployeeManage from "./layout/Dashboard/Admin/EmployeeManage";
import CustomerManage from "./layout/Dashboard/Admin/CustomerManage";
import ProductManage from "./layout/Dashboard/ProductManage/ProductManage";
import OrderManage from "./layout/Dashboard/Order/OrderManage";
import GoldManage from "./layout/Dashboard/ProductManage/GoldManage";
import DiamondManage from "./layout/Dashboard/ProductManage/DiamondManage";
import SmallDiamondManage from "./layout/Dashboard/ProductManage/SmallDiamondManage";
import NiSizePage from "./layout/Common/NiSize";
import IntroductionPage from "./layout/Common/Introduction";
import Profile from "./layout/Customer/Profile";
import HomeDashboard from "./layout/Dashboard/Home/Index";
import PricePage from "./layout/Common/PriceList";
import ForgotPassword from "./layout/Auth/forgotPassword";
import ProductListDC from "./layout/Product/ProductListDC";
import ProductListBT from "./layout/Product/ProductListBT";
import ProductListVDC from "./layout/Product/ProductListVDC";
import ProductListVN from "./layout/Product/ProductListVN";
import ProductListVT from "./layout/Product/ProductListVT";
import ProductList from "./layout/Product/ProductList";
import Promotion from "./layout/Dashboard/Promotion/Promotion";
import DeliveryPage from "./layout/Dashboard/Delivery/DeliveryOrder";
import BlogPage from "./layout/Common/blog";
import Success from "./layout/Common/Success";
import Fail from "./layout/Common/Fail";

const ROLES = {
  User: 2001,
  ADMIN: "Admin",
  SALESSTAFF: "Sale",
  DELIVERY: "Delivery",
  MANAGER: "Manager",
  CUSTOMER: "Customer",
};

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.MANAGER, ROLES.ADMIN]} />
              }
            >
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="/dashboard/product" element={<ProductManage />} />
                <Route path="/dashboard/gold" element={<GoldManage />} />
                <Route path="/dashboard/diamond" element={<DiamondManage />} />
                <Route path="/dashboard/smalldiamond" element={<SmallDiamondManage />} />
                <Route path="/dashboard/promotion" element={<Promotion />} />
              </Route>
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.SALESSTAFF]} />
              }
            >
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="/dashboard/order" element={<OrderManage />} />
              </Route>
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.ADMIN]} />
              }
            >
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="/dashboard/home" element={<HomeDashboard />} />
                <Route path="/dashboard/employee" element={<EmployeeManage />} />
                <Route path="/dashboard/customer" element={<CustomerManage />} />
                <Route path="/dashboard/order" element={<OrderManage />} />
              </Route>
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.DELIVERY]} />
              }
            >
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="/dashboard/delivery" element={<DeliveryPage />} />
              </Route>
            </Route>



            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.CUSTOMER]} />
              }
            >
              <Route path='/profile' element={<Profile />} />
              {/* cart */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/check-out" element={<Checkout />} />
            </Route>



            <Route path="/" element={<LandingPage />} />

            {/* authen */}
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in-employee" element={<LoginEmp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />



            {/* ---------------- danh sach san pham ---------------------*/}
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/nkc" element={<ProductListNKC />} />
            <Route path="/product/dc" element={<ProductListDC />} />
            <Route path="/product/bt" element={<ProductListBT />} />
            <Route path="/product/vdc" element={<ProductListVDC />} />
            <Route path="/product/vn" element={<ProductListVN />} />
            <Route path="/product/vt" element={<ProductListVT />} />

            {/* thong tin chi tiet san pham */}
            <Route path="/product/:productId" element={<ProductDetail />} />

            {/* common page */}
            <Route path="/niSize" element={<NiSizePage />} />
            <Route path="/introduction" element={<IntroductionPage />} />
            <Route path="/price-list" element={<PricePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/success" element={<Success />} />
            <Route path="/fail" element={<Fail />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </>
  );
}

export default App;


