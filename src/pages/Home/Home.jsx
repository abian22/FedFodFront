import foto from "../../assets/images/descarga.png";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();
  const { contextTheme } = useThemeContext();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const settings = [
    {
      title: "PROFILE",
      fun: () => {
        navigate("/home/profile");
      },
    },
    {
      title: "LOGOUT",
      fun: () => {
        console.log("Logout clicked"); // Agrega esto para verificar si se está llamando
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  return (
    <>
      <div
        id={contextTheme}
        style={{
          borderBottom: "solid",
          width: "100%",
          height: "15px",
          display: "flex",
          justifyContent: "right",
          marginRight: "0px",
        }}
      >
        <img
          src={foto}
          onClick={toggleMenu}
          style={{
            display: "flex",
            borderRadius: "50px",
            height: "30px",
            marginRight: "100px",
            position: "absolute",
            top: "10px",
            cursor: "pointer",
          }}
        />
      </div>
      {isMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "45px", 
            right: "100px", 
            backgroundColor: "lightgrey",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              color:"black",
              flexDirection: "column",
              justifyContent:"center",
              height:"50px"
            }}
          >
            {settings.map((item, index) => (
              <li
                key={index}
                style={{padding:"5px", cursor:"pointer", zIndex:"4px"}}
                onClick={() => {
                  toggleMenu();
                  item.fun(); // Llama a la función asociada directamente aquí
                }}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Home;
