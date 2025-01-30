import { useSelector } from "react-redux";
import { Button, Container, LogOut, Logo } from "../index";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.status);
  const navigate = useNavigate();

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

  return (
    <header
      className="py-3 shadow  flex items-center rounded"
      style={{ backgroundColor: "#011649", maxHeight: "16%" }}
    >
      <Container>
        <nav className="flex ">
          <div className="mr-10 w-2/4 flex justify-center">
            <Link to="/">
              <Logo width="180px" className="text-5xl text-white" />
            </Link>
          </div>
          <div className="w-2/4">
            <ul className="flex justify-evenly">
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
        </nav>
      </Container>
    </header>
  );
}

export default Header;
