import { useSelector } from "react-redux";
import { Button, Container, LogOut, Logo } from "../index";
import { useNavigate, Link } from "react-router-dom";
import hamburger from "../../assets/hamburger.png";
import { useState } from "react";
function Header() {
  const authStatus = useSelector((state) => state.status);
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const toggleNavItems = () => {
    setIsShow((val) => !val);
  };

  return (
    <header
      className="py-3 shadow  flex items-center rounded"
      style={{ backgroundColor: "#011649", maxHeight: "16%" }}
    >
      <Container>
        <nav className="">
          <div className="flex justify-between">
            <div className=" lg:w-2/4 md:w-1/2 md:mr-5 mr-10 flex justify-center">
              <Link to="/">
                <Logo width="180px" className="text-5xl text-white" />
              </Link>
            </div>
            <div className="w-2/4 sm:w-1/2">
              <div className="md:hidden flex flex-row-reverse">
                <p className="text-white" onClick={toggleNavItems}>
                  <div className="w-8 h-2 rounded m-1 bg-white border-black"></div>
                  <div className="w-8 h-2 rounded m-1 bg-white border-black"></div>
                  <div className="w-8 h-2 rounded m-1 bg-white border-black"></div>
                </p>
              </div>

              <ul className="hidden md:visible md:flex justify-evenly">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <Button
                        onClick={() => navigate(item.slug)}
                        className="duration-200 hover:bg-yellow-900 rounded-full"
                        style={{ backgroundColor: "#243764" }}
                        children={item.name}
                      />
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li>
                    <LogOut />
                  </li>
                )}
              </ul>
            </div>
          </div>

          {isShow && (
            <div>
               <ul>
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <Button
                        onClick={() => navigate(item.slug)}
                        className="bg-transparent"
                        children={item.name}
                      />
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li>
                    <LogOut bgColor="bg-transparent" className="text-white px-4 py-2" />
                  </li>
                )}
              </ul>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
