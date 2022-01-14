export function Index() {
  return (
    <>
      <div className="flex">
        <nav className="side-nav side-nav--simple">
          <a href="" className="intro-x flex items-center pl-5 pt-4">
            <img alt="Rubick Tailwind HTML Admin Template" className="w-6" src="/dist/images/logo.svg"/>
          </a>
          <div className="side-nav__devider my-6"/>
          <ul>
            <li>
              <a href="#" className="side-menu side-menu--active">
                <div className="side-menu__icon"><i data-feather="home"/></div>
                <div className="side-menu__title">
                  Dashboard
                  <div className="side-menu__sub-icon"><i data-feather="chevron-down"/></div>
                </div>
              </a>
              <ul className="side-menu__sub-open">
                <li>
                  <a href="simple-menu-dark-dashboard-overview-1.html" className="side-menu side-menu--active">
                    <div className="side-menu__icon"><i data-feather="activity"/></div>
                    <div className="side-menu__title"> Overview 1</div>
                  </a>
                </li>
                <li>
                  <a href="simple-menu-dark-dashboard-overview-2.html" className="side-menu">
                    <div className="side-menu__icon"><i data-feather="activity"/></div>
                    <div className="side-menu__title"> Overview 2</div>
                  </a>
                </li>
                <li>
                  <a href="simple-menu-dark-dashboard-overview-3.html" className="side-menu">
                    <div className="side-menu__icon"><i data-feather="activity"/></div>
                    <div className="side-menu__title"> Overview 3</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="side-nav__devider my-6"/>
          </ul>
        </nav>
        <div className="content">
          <div className="top-bar">
            <div className="-intro-x breadcrumb mr-auto hidden sm:flex"><a href="">Application</a> <i
              data-feather="chevron-right" className="breadcrumb__icon"/> <a href=""
                                                                             className="breadcrumb--active">Dashboard</a>
            </div>
            <div className="intro-x relative">
              <div className="search hidden sm:block">
                <input type="text" className="search__input form-control border-transparent placeholder-theme-13"
                       placeholder="Search..."/>
                <i data-feather="search" className="search__icon dark:text-gray-300"/>
              </div>
              <a className="notification sm:hidden" href=""> <i data-feather="search"
                                                                className="notification__icon dark:text-gray-300"/>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 2xl:col-span-9">
              <div className="grid grid-cols-12 gap-6">
                <div className="pt-4">Teste</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
