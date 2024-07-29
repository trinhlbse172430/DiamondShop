import React, { useState, useEffect } from "react";
import './styles.css';
import { MenuOutlined, ShoppingCartOutlined, DownOutlined, RightOutlined, SearchOutlined, PhoneFilled } from '@ant-design/icons';
import SlideBarMenu from "../SlideBarMenu/SlideBarMenu";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SmallBanner from "../../image/smallBanner.png";

const Header = () => {
    const [isDropdownOpen1, setIsDropdown1] = useState(false);
    const [isDropdownOpen2, setIsDropdown2] = useState(false);
    const [activeTab, setActiveTab] = useState(null);
    const [isSlideMenuOpen, setIsSlideMenuOpen] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [search, setSearch] = useState("");
    const [activeItem, setActiveItem] = useState(null);


    const context = useAuth();

    const navigate = useNavigate();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            navigate(`/product?search=${search}`);
        }
    };

    const handleSetActiveToLocalstorage = (id) => {
        localStorage.setItem("activeItem", id);
    };

    useEffect(() => {
        const activeItem = localStorage.getItem("activeItem");
        setActiveItem(activeItem);
    }, []);

    const { auth } = context;

    const role = localStorage.getItem("role");

    useEffect(() => {
        if (auth) {
            const token = localStorage.getItem("token");
            setLoggedIn(!!token);
        }

    }, [auth]);

    const handleMouseEnter = (id) => {
        switch (id) {
            case 1:
                setIsDropdown1(true);
                break;
            case 2:
                setIsDropdown2(true);
                break;
            default:
                break;
        }
    };

    const handleMouseLeave = (id) => {
        switch (id) {
            case 1:
                setIsDropdown1(false);
                break;
            case 2:
                setIsDropdown2(false);
                break;
            default:
                break;
        }
    };

    const handleMouseOverTab = (tabId) => {
        setActiveTab(tabId);
    };

    const handleMouseLeaveTab = () => {
        setActiveTab(null);
    };

    const handleOpenSlideMenu = () => {
        setIsSlideMenuOpen(true);
    }

    const handleLogout = async (e) => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("cart");
            navigate("/sign-in");
        } catch (error) {
            console.error(error);
        }
    };

    const reddot = {
        backgroundColor: "red",
        position: "absolute",
        width: "20px",
        height: "20px",
        top: "0",
        right: "0",
        borderRadius: "50%",
        fontSize: "15px",
    };




    return (
        <header id="header" className="header has-sticky sticky-jump">
            <SlideBarMenu
                openProp={isSlideMenuOpen} setOpenProp={setIsSlideMenuOpen}
            />
            <div className="header-wrapper">
                <div id="masthead" className="header-main show-logo-center hide-for-sticky nav-dark">
                    <div className="header-inner flex-row container logo-center medium-logo-center" role="navigation">
                        <div id="logo" className="flex-col logo">
                            <a href="http://localhost:3000" title=" ... Diamiond - Phân phối Sỉ Và Lẻ Kim Cương Việt Nam" rel="home">
                                <img width="130" height="122"
                                    src="https://daokimcuong.vn/wp-content/uploads/2021/05/logo1-removebg-preview-1.png"
                                    className="header-logo-dark" alt="Cao Hùng Diamond" />
                            </a>
                        </div>

                        {/* Mobile Left Elements */}
                        <div className="flex-col show-for-medium flex-left">
                            <ul className="mobile-nav nav nav-left ">
                            </ul>
                        </div>

                        {/* Left Elements */}
                        <div className="flex-col hide-for-medium flex-left">
                            <ul className="header-nav header-nav-main nav nav-left  nav-uppercase">
                                <li className="html custom html_topbar_left">
                                    Hệ thống showrooms
                                    <br />CN HCM: 35 Trần Phú, Phường 4, quận 5, TP. HCM<br />
                                    CN CT: 53 Trần Phú, Ninh Kiều, Cần Thơ
                                </li>
                            </ul>
                        </div>

                        {/* Right Elements  */}
                        <div className="flex-col hide-for-medium flex-right">
                            <ul className="header-nav header-nav-main nav nav-right  nav-uppercase">
                                <li className="html custom html_topbar_right"><PhoneFilled /> 0933 1977 55 - 0877
                                    056 688</li>
                                <li className="cart-item has-icon" onClick={() => handleSetActiveToLocalstorage("menu-item-6")} >
                                    {role && role === "Customer" && (
                                        <a href="http://localhost:3000/cart" className="header-cart-link is-small"
                                            title="Giỏ hàng"
                                        >
                                            <span className="header-cart-title">
                                                Giỏ hàng</span>
                                            <ShoppingCartOutlined />
                                            {/* <div style={reddot}>{context.productNumber}</div> */}

                                        </a>
                                    )}
                                </li>
                                <li className="header-search-form search-form html relative has-icon">
                                    <div className="header-search-form-wrapper">
                                        <div className="searchform-wrapper ux-search-box relative form-flat is-normal">

                                            <div className="flex-row relative">
                                                <div className="flex-col flex-grow">
                                                    <label className="screen-reader-text"
                                                        htmlFor="woocommerce-product-search-field-0">Tìm kiếm:</label>
                                                    <input type="search" id="woocommerce-product-search-field-0"
                                                        className="search-field mb-0" placeholder="Tìm kiếm…" name="s"
                                                        autoComplete="off" onChange={(e) => setSearch(e.target.value)}
                                                        onKeyPress={handleKeyPress} />
                                                    <input type="hidden" name="post_type" />
                                                </div>
                                                <div className="flex-col">
                                                    <button
                                                        className="ux-search-submit submit-button secondary button  icon mb-0"
                                                        onClick={() => navigate(`/product?search=${search}`)}
                                                    >
                                                        <SearchOutlined /> </button>
                                                </div>
                                            </div>
                                            <div className="live-search-results text-left z-top">
                                                <div className="autocomplete-suggestions"
                                                    style={{ position: 'absolute', display: 'none', maxHeight: '300px', zIndex: 9999 }}>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="container">
                        <div className="top-divider full-width"></div>
                    </div>
                </div>
                <div id="wide-nav" className="header-bottom wide-nav nav-dark flex-has-center">
                    <div className="flex-row container">

                        <div className="flex-col hide-for-medium flex-center">
                            <ul className="nav header-nav header-bottom-nav nav-center  nav-uppercase nav-center">
                                <li id="menu-item-6344"
                                    onClick={() => handleSetActiveToLocalstorage("menu-item-6344")}
                                    className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-1840 current_page_item menu-item-6344 menu-item-design-default ${activeItem === "menu-item-6344" ? 'active' : ''}`}
                                >
                                    <a href="/" aria-current="page" className="nav-top-link">HOME</a>
                                </li>
                                <li id="menu-item-1"
                                    onClick={() => handleSetActiveToLocalstorage("menu-item-1")}
                                    className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-4 menu-item-design-default  ${activeItem === "menu-item-1" ? 'active' : ''}`}>
                                    <a href="/product/nkc" className="nav-top-link"><img
                                        className="ux-menu-icon entered lazyloaded" width="25" height="25"
                                        alt="Viên kim cương Icon"
                                        src="https://caohungdiamond.com/wp-content/uploads/2024/04/Vien-Kim-Cuong-icon.png"
                                        data-ll-status="loaded" />Nhẫn kim cương</a></li>
                                <li id="menu-item-2"
                                    onClick={() => handleSetActiveToLocalstorage("menu-item-2")}
                                    className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-4 menu-item-design-default  ${activeItem === "menu-item-2" ? 'active' : ''}`}>
                                    <a href="/product/vt" className="nav-top-link"><img
                                        className="ux-menu-icon entered lazyloaded" width="25" height="25"
                                        alt="Viên kim cương Icon"
                                        src="https://caohungdiamond.com/wp-content/uploads/2024/04/Vien-Kim-Cuong-icon.png"
                                        data-ll-status="loaded" />Lắc/vòng tay kim cương</a></li>
                                <li id="menu-item-3"
                                    onClick={() => handleSetActiveToLocalstorage("menu-item-3")}
                                    className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-3 menu-item-design-default  ${activeItem === "menu-item-3" ? 'active' : ''}`}>
                                    <a href="/product/bt" className="nav-top-link"><img
                                        className="ux-menu-icon entered lazyloaded" width="25" height="25"
                                        alt="Viên kim cương Icon"
                                        src="https://caohungdiamond.com/wp-content/uploads/2024/04/Vien-Kim-Cuong-icon.png"
                                        data-ll-status="loaded" />Bông tai kim cương</a></li>
                                <li id="menu-item-4"
                                    onClick={() => handleSetActiveToLocalstorage("menu-item-4")}
                                    className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-4 menu-item-design-default  ${activeItem === "menu-item-4" ? 'active' : ''}`}>
                                    <a href="/product/dc" className="nav-top-link"><img
                                        className="ux-menu-icon entered lazyloaded" width="25" height="25"
                                        alt="Viên kim cương Icon"
                                        src="https://caohungdiamond.com/wp-content/uploads/2024/04/Vien-Kim-Cuong-icon.png"
                                        data-ll-status="loaded" />Dây chuyền kim cương</a></li>
                                <li id="menu-item-6471"
                                    className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-6471 menu-item-design-default has-icon-left ${activeItem === "menu-item-6471" ? 'active' : ''}`}
                                    onClick={() => handleSetActiveToLocalstorage("menu-item-6471")}>
                                    <a href="/price-list" className="nav-top-link"><img
                                        className="ux-menu-icon entered lazyloaded" width="25" height="25"
                                        alt="Viên kim cương Icon"
                                        src="https://caohungdiamond.com/wp-content/uploads/2024/04/Vien-Kim-Cuong-icon.png"
                                        data-ll-status="loaded" />Bảng giá kim cương</a>
                                </li>
                                {role && role === "Admin" && (
                                    <li id="menu-item-6409"
                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default">
                                        <a href="/dashboard/home" className="nav-top-link">Dashboard</a></li>
                                )}
                                {role && role === "Manager" && (
                                    <li id="menu-item-6409"
                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default">
                                        <a href="/dashboard/product" className="nav-top-link">Dashboard</a></li>
                                )}
                                {role && role === "Sale" && (
                                    <li id="menu-item-6409"
                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default">
                                        <a href="/dashboard/order" className="nav-top-link">Dashboard</a></li>
                                )}
                                {role && role === "Delivery" && (
                                    <li id="menu-item-6409"
                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default">
                                        <a href="/dashboard/order" className="nav-top-link">Dashboard</a></li>
                                )}
                                {role && role === "Customer" && (
                                    <li id="menu-item-6409"
                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default">
                                        <a href="/Profile" className="nav-top-link">PROFILE</a></li>
                                )}


                                {isLoggedIn && (
                                    <>
                                        <li id="menu-item-6409" onClick={() => handleLogout()}
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default right-nav-items" style={{ marginLeft: '100px' }}>
                                            <a href="" className="nav-top-link">Logout</a></li>
                                    </>
                                )}
                                {!isLoggedIn && (
                                    <>
                                        <li id="menu-item-6409"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default right-nav-items" style={{ marginLeft: '100px' }}>
                                            <a href="/sign-in" className="nav-top-link">Đăng nhập</a></li>
                                        <li id="menu-item-6409"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6409 menu-item-design-default right-nav-items">
                                            <a href="/sign-up" className="nav-top-link">Đăng ký</a></li>
                                    </>
                                )}
                            </ul>
                        </div>

                        <div className="flex-col show-for-medium flex-grow">
                            <ul className="nav header-bottom-nav nav-center mobile-nav  nav-uppercase">
                                <li className="nav-icon has-icon" onClick={handleOpenSlideMenu}>
                                    <a href="#" data-open="#main-menu" data-pos="left" data-bg="main-menu-overlay"
                                        data-color="dark" className="is-small" aria-label="Menu" aria-controls="main-menu"
                                        aria-expanded="false">
                                        <MenuOutlined />
                                    </a>
                                </li>
                                <li className="html custom html_nav_position_text"><a href=""><img
                                    src="https://daokimcuong.vn/wp-content/uploads/2021/05/logo1-removebg-preview-1.png"
                                    alt="Logo Cao Hùng Diamond Mobile" style={{ maxHeight: '60px' }} /></a></li>
                                <li className="cart-item has-icon">

                                    {role && role === "Customer" && (
                                        <a href="http://localhost:3000/cart" className="header-cart-link is-small"
                                            title="Giỏ hàng">
                                            <span className="header-cart-title">
                                                Giỏ hàng </span>
                                            <ShoppingCartOutlined />
                                        </a>
                                    )}

                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className="header-bg-container fill">

                </div>
            </div>
        </header >
    )
}

export default Header;