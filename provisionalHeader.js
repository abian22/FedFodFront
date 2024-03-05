{/*  <div className="headerContainer">
        <img
          id={contextTheme}
          className="headerContainer__menuIcon"
          src={contextTheme === "Light" ? darkMenu : lightMenu}
          onClick={toggleMenu}
        />
        {isMenuOpen && (
          <div className="menuContainer">
            <ul
              className="menuContainer__menuUl"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {menu.map((option, index) => (
                <li
                  className="menuContainer__menuUl--menuLi"
                  key={index}
                  onClick={() => {
                    toggleMenu();
                    option.fun();
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img style={{ height: "20px" }} 
                 src={hoveredIndex === index ? option.lightTitle : option.darkTitle} />
                </li>
              ))}
              <input
                className="menuContainer__menuUl--searchInput"
                placeholder="Buscar..."
              />
              <img
                className="menuContainer__menuUl--searchIcon"
                src={searchIcon}
              />
            </ul>
          </div>
        )}

        <div className="headerContainer__profileContainer">
          <img
            className="headerContainer__profileImg"
            src={profileImg}
            onClick={toggleMenuProfile}
          />
          {isMenuProfileOpen && (
            <div className="headerContainer__profilePannel">
              <ul className="headerContainer__profilePannel--profileOptions">
                {settings.map((item, index) => (
                  <li
                    className="headerContainer__profilePannel--profileOption"
                    key={index}
                    onClick={() => {
                      toggleMenuProfile();
                      item.fun();
                    }}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div> */}