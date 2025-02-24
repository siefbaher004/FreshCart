import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
export default function Navbar() {
  const { IsLogin, setIsLogin } = useContext(UserContext);
  const { numOfCartItems } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  function Signout() {
    setIsLogin(null);
    localStorage.removeItem("userToken");
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`bg-slate-300 relative  top-0 left-0 right-0 z-50 flex transition-transform duration-300  ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="w-full flex flex-wrap items-center justify-between p-4 mx-[10%]">
          <div className="flex items-center">
            <Link
              to={localStorage.getItem("userToken") ? "" : "login"}
              className="flex items-center space-x-3 pr-3"
            >
              <img src={logo} className="h-8" alt="fresh cart Logo" />
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-emerald-700 rounded-lg lg:hidden hover:bg-emerald-500 hover:text-black focus:outline-none"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <i
              className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`}
            ></i>
          </button>

          <div
            className={`w-full shrink lg:flex justify-between lg:w-auto items-center gap-8 transition-all duration-300 overflow-hidden ${
              isMenuOpen ? "max-h-[500px]" : "max-h-0 lg:max-h-full"
            }`}
          >
            {IsLogin && (
              <ul className="font-medium flex flex-col lg:flex-row gap-4 text-center p-2">
                <li>
                  <Link
                    to=""
                    className="block py-2 text-white bg-emerald-700 rounded-sm lg:bg-transparent lg:text-emerald-700 hover:bg-emerald-400 lg:hover:bg-transparent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="cart"
                    className="relative block py-2 text-slate-700 rounded-sm hover:bg-slate-400 lg:hover:bg-transparent hover:text-emerald-700 overflow-visible"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cart <i className="fas fa-cart-shopping"></i> 
                    <div className="absolute top-[-8px] right-[-8px] bg-emerald-500 rounded-full text-slate-700 flex items-center justify-center w-5 h-5">{numOfCartItems}</div>
                  </Link>
                </li>
                <li className="">
                  <Link
                    to="whishlist"
                    className=" block py-2 text-slate-700 rounded-sm hover:bg-slate-400 lg:hover:bg-transparent hover:text-emerald-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    WishList <i className="fas fa-heart"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    to="products"
                    className="block py-2 text-slate-700 rounded-sm hover:bg-slate-400 lg:hover:bg-transparent hover:text-emerald-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="catagories"
                    className="block py-2 text-slate-700 rounded-sm hover:bg-slate-400 lg:hover:bg-transparent hover:text-emerald-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="brands"
                    className="block py-2 text-slate-700 rounded-sm hover:bg-slate-400 lg:hover:bg-transparent hover:text-emerald-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Brands
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="allorders"
                    className="block py-2 text-slate-700 rounded-sm hover:bg-slate-400 lg:hover:bg-transparent hover:text-emerald-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Orders
                  </Link>
                </li> */}
              </ul>
            )}

            <ul className="flex gap-3 justify-center py-2">
              <li>
                <Link
                  to="https://www.facebook.com/"
                  target="_blank"
                  className="text-slate-700 hover:text-emerald-700"
                >
                  <i className="fab fa-facebook"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.youtube.com/"
                  target="_blank"
                  className="text-slate-700 hover:text-emerald-700"
                >
                  <i className="fab fa-youtube"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.instagram.com/"
                  target="_blank"
                  className="text-slate-700 hover:text-emerald-700"
                >
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.linkedin.com/"
                  target="_blank"
                  className="text-slate-700 hover:text-emerald-700"
                >
                  <i className="fab fa-linkedin"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.twitter.com/"
                  target="_blank"
                  className="text-slate-700 hover:text-emerald-700"
                >
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
            </ul>

            <ul className="flex gap-4 justify-center">
              {IsLogin == null ? (
                <>
                  <li className="hover:bg-slate-400 lg:hover:bg-transparent">
                    <Link
                      to="login"
                      className="py-2 text-slate-700 hover:text-emerald-700"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="hover:bg-slate-400 lg:hover:bg-transparent">
                    <Link
                      to="Register"
                      className="py-2 text-slate-700 hover:text-emerald-700"
                    >
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <Link
                  onClick={Signout}
                  to="login"
                  className="hover:bg-slate-400 lg:hover:bg-transparent w-full text-center  py-2 text-red-500 hover:text-red-800"
                >
                  <li>Signout</li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
