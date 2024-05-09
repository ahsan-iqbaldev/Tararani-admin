/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Register from "views/auth/Register.js";
import Login from "views/auth/Login.js";
import forgotPassword from "views/auth/ForgotPassword";
import PropertyListings from "views/propertly-listings/PropertyListings";
import CreateListing from "views/propertly-listings/CreateListing";
import coHost from "views/CoHost/CoHost";
import EditListing from "views/propertly-listings/EditListing";
import BookingRequests from "views/BookingRequests/BookingRequests";
import Bookings from "views/Bookings/Bookings";
import Disputes from "views/Disputes/Disputes";
import Settings from "views/Settings";
import BookingDetails from "views/BookingDetails";
import PropertyDetails from "views/propertly-listings/PropertyDetails";
import CreateBooking from "views/Bookings/CreateBooking";
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-site-primary",
    component: Index,
    layout: "/admin",
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    isMenu: false,
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    isMenu: false,
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    icon: "ni ni-circle-08 text-pink",
    component: forgotPassword,
    layout: "/auth",
    isMenu: false,
  },
  {
    path: "/products",
    name: "Products",
    icon: "ni ni-building text-site-primary",
    component: PropertyListings,
    layout: "/admin",
  },
  {
    path: "/create-listing",
    name: "Create Listing",
    icon: "ni ni-shop text-site-primary",
    component: CreateListing,
    layout: "/admin",
    isMenu: false,
  },
  {
    path: "/category",
    name: "Category",
    icon: "ni ni-single-02 text-site-primary",
    component: coHost,
    layout: "/admin",
  },
  {
    path: "/update-listing/:id",
    name: "Create Listing",
    icon: "ni ni-shop text-site-primary",
    component: EditListing,
    layout: "/admin",
    isMenu: false,
  },
  {
    path: "/bookings",
    name: "Bookings",
    icon: "ni ni-check-bold text-site-primary",
    component: Bookings,
    layout: "/admin",
  },
  {
    path: "/booking-requests",
    name: "Booking Requests",
    icon: "ni ni-bag-17 text-site-primary",
    component: BookingRequests,
    layout: "/admin",
  },

  {
    path: "/disputes",
    name: "Disputes",
    icon: "ni ni-ui-04 text-site-primary",
    component: Disputes,
    layout: "/admin",
  },

  {
    path: "/settings",
    name: "Settings",
    icon: "ni ni-settings text-site-primary",
    component: Settings,
    layout: "/admin",
  },

  {
    path: "/booking/:id",
    name: "Booking Details",
    icon: "ni ni-settings text-site-primary",
    component: BookingDetails,
    layout: "/admin",
    isMenu: false,
  },
  {
    path: "/property/:id",
    name: "Property Details",
    icon: "ni ni-settings text-site-primary",
    component: PropertyDetails,
    layout: "/admin",
    isMenu: false,
  },
  {
    path: "/create-booking",
    name: "Create Booking",
    icon: "ni ni-settings text-site-primary",
    component: CreateBooking,
    layout: "/admin",
    isMenu: false,
  },
];

export default routes;
