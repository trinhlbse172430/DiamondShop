import React, { useState, useEffect } from "react";
import '../Header/styles.css';
import { MenuOutlined, ShoppingCartOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import SlideBarMenu from "../SlideBarMenu/SlideBarMenu";

const Footer = () => {
    return (
        <footer id="footer" className="footer-wrapper">
            <div className="footer-widgets footer footer-1">
                <div className="row dark large-columns-3 mb-0">
                    <div id="custom_html-3" className="widget_text col pb-0 widget widget_custom_html">
                        <div className="textwidget custom-html-widget">
                            <img src="https://daokimcuong.vn/wp-content/uploads/2021/05/logo1-removebg-preview-1.png" alt="Logo Cao Hùng Diamond Footer" style={{ maxWidth: '90px', display: 'block', margin: ' 0 auto 20px' }} data-lazy-src="/wp-content/uploads/2020/08/logo-caohung250.png" />
                            <noscript>
                                <img src="/wp-content/uploads/2020/08/logo-caohung250.png" alt="Logo Cao Hùng Diamond Footer" style={{ maxWidth: '90px', display: 'block', margin: ' 0 auto 20px' }} />
                            </noscript>
                            <ul>
                                <li>
                                    <span className="widget-title">Công Ty TNHH ELEANOR Diamond</span>
                                </li>
                                <li>Giấy phép kinh doanh số: 0316398901 do sở Kế hoạch và Đầu tư TP.HCM cấp ngày 22/07/2020 </li>
                                <li>
                                    <a href="mailto:caohungdiamond@gmail.com">
                                        <i className="fa-solid fa-envelope"></i>
                                        eleanordiamond@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <i className="fa-solid fa-location-dot"></i>
                                    Hệ thống showrooms <br />
                                    CN HCM: 35 Trần Phú, Phường 4, Quận 5, TP. HCM <br />CN CT: 53 Trần Phú, Ninh Kiều, Cần Thơ
                                </li>
                                <li id="callfooter">
                                    <i className="fa-solid fa-phone"></i>
                                    0933 1977 55 - 0877 056 688
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="custom_html-4" className="widget_text col pb-0 widget widget_custom_html">
                        <span className="widget-title">Thông tin công ty</span>
                        <div className="is-divider small"></div>
                        <div className="textwidget custom-html-widget">
                            <ul>
                                <li>
                                    <a href="/gioi-thieu/">Giới thiệu</a>
                                </li>
                                <li>
                                    <a href="/lien-he/">Liên hệ</a>
                                </li>
                                <li>
                                    <a href="/cau-hoi-thuong-gap/">Câu hỏi thường gặp</a>
                                </li>
                                <li>
                                    <a href="/bang-gia-kim-cuong/">Bảng giá kim cương</a>
                                </li>
                                <li>
                                    <a href="/huong-dan-do-size-nhan/">Hướng dẫn đo size: Nhẫn kim cương</a>
                                </li>
                                <li>
                                    <a href="/huong-dan-do-size-trang-suc-day-chuyen/">Hướng dẫn đo size: Dây chuyền</a>
                                </li>
                                <li>
                                    <a href="/huong-dan-do-size-lac-tay/">Hướng dẫn đo size: Lắc & vòng tay</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="custom_html-6" className="widget_text col pb-0 widget widget_custom_html">
                        <span className="widget-title">Theo dõi chúng tôi</span>
                        <div className="is-divider small"></div>
                        <div className="textwidget custom-html-widget">
                            <ul className="footer-social">
                                <li>
                                    <a target="_blank" href="https://www.facebook.com/caohungdiamond" rel="noopener">
                                        <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-app-round-white-icon.png" alt="Icon Facebook" data-lazy-src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-app-round-white-icon.png"
                                            width="38"
                                            height="38" />
                                        <noscript>
                                            <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-app-round-white-icon.png" alt="Icon Facebook" />
                                        </noscript>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://www.instagram.com/caohung.diamond/" rel="noopener">
                                        <img src="https://awareak.org/wp-content/uploads/2023/07/CITYPNG.COMHD-White-Instagram-Round-Logo-Icon-PNG-1600x1200-1.png" alt="Icon Instagram" data-lazy-src="/wp-content/uploads/2022/06/Instagram-Negative.png"
                                            width="38"
                                            height="38" />
                                        <noscript>
                                            <img src="/wp-content/uploads/2022/06/Instagram-Negative.png" alt="Icon Instagram" />
                                        </noscript>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/@caohungdiamond">
                                        <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/youtube-app-white-icon.png" alt="Icon Youtube" data-lazy-src="/wp-content/uploads/2022/06/YouTube-Negative.png"
                                            width="38"
                                            height="38" />
                                        <noscript>
                                            <img src="/wp-content/uploads/2022/06/YouTube-Negative.png" alt="Icon Youtube" />
                                        </noscript>
                                    </a>
                                </li>
                            </ul>
                            {/* <span className="widget-title">Hệ thống showrooms</span>
                            <div className="is-divider small"></div>
                            <span>CN Hồ Chí Minh</span>
                            <span>CN Cần Thơ</span> */}
                            <div>
                                <iframe src="about:blank" width="600" height="150" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" data-rocket-lazyload="fitvidscompatible" data-lazy-src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15678.561302753198!2d106.678847!3d10.7621784!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x27c97a01124ab137!2zTmjhuqtuIGtpbSBjxrDGoW5nIC0gQ2FvIEjDuW5nIERpYW1vbmQ!5e0!3m2!1svi!2s!4v1657709223661!5m2!1svi!2s"></iframe>
                                <noscript>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15678.561302753198!2d106.678847!3d10.7621784!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x27c97a01124ab137!2zTmjhuqtuIGtpbSBjxrDGoW5nIC0gQ2FvIEjDuW5nIERpYW1vbmQ!5e0!3m2!1svi!2s!4v1657709223661!5m2!1svi!2s" width="600" height="150" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </noscript>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="absolute-footer dark medium-text-center small-text-center">
                <div className="container clearfix">

                    <div className="copyright-footer" style={{ textAlign: "center" }}>
                        Copyright © 2024 eleanor diamond
                    </div>

                </div>
            </div>
            <a href="#top" className="back-to-top button icon invert plain fixed bottom z-1 is-outline circle" id="top-link" aria-label="Go to top">
                <i className="icon-angle-up"></i>
            </a>
        </footer>
    )
}

export default Footer;