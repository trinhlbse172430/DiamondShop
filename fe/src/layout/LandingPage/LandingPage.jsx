
import './LandingPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from 'antd'
import '../../components/Header/styles.css';
import Banner from '../../image/banner2.jpg'
import SmallBanner from '../../image/smallBanner.png'
import { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from '../Product/Components/ProductItem';
import {
    Box,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";


const { Meta } = Card;

const CardItem = ({ image, title, description }) => {
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={image} />}
        >
            <Meta title={title} description={description} />
        </Card>
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}


const Home = () => {
    const [data, setData] = useState([]);
    const [dataBT, setDataBT] = useState([]);
    const [dataDC, setDataDC] = useState([]);
    const [dataVT, setDataVT] = useState([]);
    const [dataVDC, setDataVDC] = useState([]);
    const [dataVN, setDataVN] = useState([]);
    const [dataNKC, setDataNKC] = useState([]);

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 6,
        initialSlide: 0,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
    };

    const loadAllProduct = async () => {
        try {
            const loadData = await axios.get('/product');
            if (loadData.error) {
                console.log('erroe' + loadData.error);
            } else {
                setData(loadData.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadAllProduct();
    }, []);

    const loadDataTypes = async (data) => {
        console.log('data', data);
        const dataBT = data.filter((product) => product.ProTypeID === 'BONGTAI').slice(0, 5);
        setDataBT(dataBT);
        const dataDC = data.filter((product) => product.ProTypeID === 'CHUYEN').slice(0, 5);
        setDataDC(dataDC);
        const dataVT = data.filter((product) => product.ProTypeID === 'VONGTAY').slice(0, 5);
        setDataVT(dataVT);
        const dataVDC = data.filter((product) => product.ProTypeID === 'VOCHUYEN').slice(0, 5);
        setDataVDC(dataVDC);
        const dataVN = data.filter((product) => product.ProTypeID === 'VONHAN').slice(0, 5);
        setDataVN(dataVN);
        const dataNKC = data.filter((product) => product.ProTypeID === 'NHAN').slice(0, 5);
        setDataNKC(dataNKC);
    }

    useEffect
        (() => {
            loadDataTypes(data);
        }, [data]);

    return (
        <>
            <Header />
            <section className="section" id="section_1" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                <div className="bg section-bg fill bg-fill bg-loaded">
                </div>
                <div className="section-content relative">
                    <div className="img has-hover x md-x lg-x y md-y lg-y" id="image_1422776750" style={{ width: "100%" }}>
                        <div className="img-inner dark">
                            <img fetchpriority="high" decoding="async" width="1020" height="381" src={Banner} className="attachment-large size-large entered lazyloaded" alt="Banner Home Page" />
                        </div>
                    </div>

                </div>
            </section>
            <section className="section" id="section_2" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                <div className="bg section-bg fill bg-fill bg-loaded"></div>
                <div className="section-content relative">
                    <div className="row row-small" id="row-152120236">
                        <div id="col-251881028" className="col small-12 large-12">
                            <div className="col-inner">
                                <h2 className="uppercase" style={{ color: '#fff' }}>Danh mục nổi bật</h2>
                            </div>
                        </div>
                        <div id="col-393606776" className="col pb-0 small-12 large-12">
                            <div className="col-inner">


                                <div className="slider-container">
                                    <Slider {...settings}>
                                        <div className="product-category col is-selected" style={{ position: 'absolute' }}>
                                            <div className="col-inner">
                                                <a aria-label="Visit product category Nhẫn Kim Cương Nam" href="/product/nkc">
                                                    <div className="box box-category has-hover box-normal ">
                                                        <div className="box-image">
                                                            <div className="">
                                                                <img decoding="async" src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" alt="Nhẫn Kim Cương Nam" width="300" height="300" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" data-ll-status="loaded" className="entered lazyloaded" />
                                                            </div>
                                                        </div>
                                                        <div className="box-text text-center">
                                                            <div className="box-text-inner">
                                                                <h5 className="uppercase header-title">
                                                                    Nhẫn Kim Cương
                                                                </h5>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="product-category col is-selected" style={{ position: 'absolute' }}>
                                            <div className="col-inner">
                                                <a aria-label="Visit product category Nhẫn Kim Cương Nam" href="/product/bt">
                                                    <div className="box box-category has-hover box-normal ">
                                                        <div className="box-image">
                                                            <div className="">
                                                                <img decoding="async" src="https://caohungdiamond.com/wp-content/uploads/2022/06/bong-tai.png" alt="Nhẫn Kim Cương Nam" width="300" height="300" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" data-ll-status="loaded" className="entered lazyloaded" />
                                                            </div>
                                                        </div>
                                                        <div className="box-text text-center">
                                                            <div className="box-text-inner">
                                                                <h5 className="uppercase header-title">
                                                                    Bông tai kim cương
                                                                </h5>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                        <div className="product-category col is-selected" style={{ position: 'absolute' }}>
                                            <div className="col-inner">
                                                <a aria-label="Visit product category Nhẫn Kim Cương Nam" href="/product/vt">
                                                    <div className="box box-category has-hover box-normal ">
                                                        <div className="box-image">
                                                            <div className="">
                                                                <img decoding="async" src="https://caohungdiamond.com/wp-content/uploads/2023/11/icon-vong-tay-kim-cuong.png" alt="Nhẫn Kim Cương Nam" width="300" height="300" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" data-ll-status="loaded" className="entered lazyloaded" />
                                                            </div>
                                                        </div>
                                                        <div className="box-text text-center">
                                                            <div className="box-text-inner">
                                                                <h5 className="uppercase header-title">
                                                                    Lắc vòng, tay kim cương
                                                                </h5>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="product-category col is-selected" style={{ position: 'absolute' }}>
                                            <div className="col-inner">
                                                <a aria-label="Visit product category Nhẫn Kim Cương Nam" href="/product/dc">
                                                    <div className="box box-category has-hover box-normal ">
                                                        <div className="box-image">
                                                            <div className="">
                                                                <img decoding="async" src="https://caohungdiamond.com/wp-content/uploads/2024/04/i-mat-day-chuyen-kim-cuong.png" alt="Nhẫn Kim Cương Nam" width="300" height="300" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" data-ll-status="loaded" className="entered lazyloaded" />
                                                            </div>
                                                        </div>
                                                        <div className="box-text text-center">
                                                            <div className="box-text-inner">
                                                                <h5 className="uppercase header-title">
                                                                    Dây chuyền kim cương
                                                                </h5>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                    </Slider>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <section className="section" id="section_3" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                <div className="bg section-bg fill bg-fill bg-loaded">
                </div>
                <div className="section-content relative">
                    <div className="row row-small align-equal" id="row-1790480698">
                        <div id="col-251220588" className="col small-12 large-12">
                            <div className="col-inner">
                                <h2>Tại sao chọn chúng tôi</h2>
                            </div>
                        </div>
                        <div id="col-716856435" className="col medium-3 small-12 large-3" >
                            <div className="col-inner" style={{ backgroundColor: 'rgb(42, 42, 42)', borderRadius: '5px' }}>
                                <div className="icon-box featured-box icon-box-center text-center" style={{ margin: '10px 10px 10px 10px' }}>
                                    <div className="icon-box-img" style={{ width: '90px' }}>
                                        <div className="icon">
                                            <div className="icon-inner">
                                                <img decoding="async" width="91" height="90" src="https://caohungdiamond.com/wp-content/uploads/2022/06/Sparkling-Diamond-Gold.png" className="attachment-medium size-medium entered lazyloaded" alt="Sparkling Diamond Gold" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/Sparkling-Diamond-Gold.png" data-ll-status="loaded" /><noscript><img decoding="async" width="91" height="90" src="https://caohungdiamond.com/wp-content/uploads/2022/06/Sparkling-Diamond-Gold.png" className="attachment-medium size-medium" alt="Sparkling Diamond Gold" /></noscript>					</div>
                                        </div>
                                    </div>
                                    <div className="icon-box-text last-reset">

                                        <h3 className="uppercase">Kim cương giá rẻ</h3>
                                        <p style={{ fontSize: '14px' }}>Cung cấp các mẫu trang sức đẹp sắc sảo, đẳng cấp trong kiểu dáng, tinh tế trong từng chi tiết với giá thành rẻ nhất thị trường hiện tại</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="col-194442185" className="col medium-3 small-12 large-3">
                            <div className="col-inner" style={{ backgroundColor: 'rgb(42, 42, 42)', borderRadius: '5px' }}>
                                <div className="icon-box featured-box icon-box-center text-center" style={{ margin: '10px 10px 10px 10px' }}>
                                    <div className="icon-box-img" style={{ width: '90px' }}>
                                        <div className="icon">
                                            <div className="icon-inner">
                                                <img decoding="async" width="91" height="90" src="https://caohungdiamond.com/wp-content/uploads/2022/06/Trust.png" className="attachment-medium size-medium entered lazyloaded" alt="Trust" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/Trust.png" data-ll-status="loaded" /><noscript><img decoding="async" width="91" height="90" src="https://caohungdiamond.com/wp-content/uploads/2022/06/Trust.png" className="attachment-medium size-medium" alt="Trust" /></noscript>					</div>
                                        </div>
                                    </div>
                                    <div className="icon-box-text last-reset">

                                        <h3 className="uppercase">CHất lượng hoàn mỹ</h3>
                                        <p style={{ fontSize: '14px' }}>Kim cương thiên nhiên nhập khẩu chính ngạch 100% được lựa chọn hết sức cẩn thận, có độ tinh khiết và sáng bóng dù là viên nhỏ nhất</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="col-2013202466" className="col medium-3 small-12 large-3">
                            <div className="col-inner" style={{ backgroundColor: 'rgb(42, 42, 42)', borderRadius: '5px' }}>
                                <div className="icon-box featured-box icon-box-center text-center" style={{ margin: '10px 10px 10px 10px' }}>
                                    <div className="icon-box-img" style={{ width: '90px' }}>
                                        <div className="icon">
                                            <div className="icon-inner">
                                                <img decoding="async" width="91" height="90" src="https://caohungdiamond.com/wp-content/uploads/2022/06/Clock.png" className="attachment-medium size-medium entered lazyloaded" alt="Clock" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/Clock.png" data-ll-status="loaded" /><noscript><img decoding="async" width="91" height="90" src="https://caohungdiamond.com/wp-content/uploads/2022/06/Clock.png" className="attachment-medium size-medium" alt="Clock" /></noscript>					</div>
                                        </div>
                                    </div>
                                    <div className="icon-box-text last-reset">

                                        <h3 className="uppercase">Tận tâm phục vụ</h3>
                                        <p style={{ fontSize: '14px' }}>Đội ngũ nhân viên tận tâm, yêu nghề, giàu chuyên môn, luôn sẵn sàng phục vụ. Đảm bảo làm hài lòng mọi khách hàng khó tính nhất</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="col-178309378" className="col medium-3 small-12 large-3">
                            <div className="col-inner" style={{ backgroundColor: 'rgb(42, 42, 42)', borderRadius: '5px' }}>
                                <div className="icon-box featured-box icon-box-center text-center" style={{ margin: '10px 10px 10px 10px' }}>
                                    <div className="icon-box-img" style={{ width: '90px' }}>
                                        <div className="icon">
                                            <div className="icon-inner">
                                                <img decoding="async" width="91" height="90" src="https://caohungdiamond.com/wp-content/uploads/2022/06/Gift.png" className="attachment-medium size-medium entered lazyloaded" alt="Gift" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/Gift.png" data-ll-status="loaded" /><noscript><img decoding="async" width="91" height="90" src="https://caohungdiamond.com/wp-content/uploads/2022/06/Gift.png" className="attachment-medium size-medium" alt="Gift" /></noscript>					</div>
                                        </div>
                                    </div>
                                    <div className="icon-box-text last-reset">

                                        <h3 className="uppercase">Chính sách hấp dẫn</h3>
                                        <p style={{ fontSize: '14px' }}>Bảo hành và làm mới trang sức trọn đời. Nhận thu đổi kim cương với % cực hấp dẫn. Nhận bỏ sỉ kim cương giá tốt toàn Việt Nam</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section" id="section_4" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                <div className="bg section-bg fill bg-fill bg-loaded">
                </div>
                <div className="section-content relative">

                    <div className="row row-small align-equal" id="row-506754410">

                        <div id="col-138763887" className="col small-12 large-12">
                            <div className="col-inner">
                                <div className="img has-hover x md-x lg-x y md-y lg-y" id="image_296087787" style={{ width: '100%' }}>
                                    <div className="img-inner dark">
                                        <img decoding="async" width="1020" height="355" src={SmallBanner} className="attachment-large size-large entered lazyloaded" alt="nhan nu Home Page" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="col-985727245" className="col small-12 large-12">
                            <div className="col-inner">
                                <div id="text-3803404377" className="text" style={{ textAlign: 'center' }}>
                                    <h2 className="uppercase">Nhẫn kim cương</h2>
                                </div>
                            </div>
                        </div>
                        <div id="col-250429594" className="col small-12 large-12">
                            {/* nhan nu */}
                            <Box className="site-main">
                                <Grid container spacing={2}>
                                    {!dataNKC || dataNKC.length === 0 ? (
                                        <Typography variant="h5" style={{ textAlign: 'center' }}></Typography>
                                    ) : (
                                        dataNKC.map((product) => (
                                            <ProductItem key={product.ProductID} product={product} />
                                        ))
                                    )}
                                </Grid>
                            </Box>
                        </div>
                        <div id="col-1533316930" className="col pb-0 small-12 large-12">
                            <div className="col-inner text-center">
                                <a href="/product/nkc" className="button primary lowercase home-button" style={{ borderRadius: '5px' }}>
                                    <span>Xem thêm</span>
                                </a>
                            </div>
                        </div>

                        <div id="col-138763887" className="col small-12 large-12">
                            <div className="col-inner">
                                <div className="img has-hover x md-x lg-x y md-y lg-y" id="image_296087787" style={{ width: '100%' }}>
                                    <div className="img-inner dark">
                                        <img decoding="async" width="1020" height="355" src={SmallBanner} className="attachment-large size-large entered lazyloaded" alt="nhan nu Home Page" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="col-985727245" className="col small-12 large-12">
                            <div className="col-inner">
                                <div id="text-3803404377" className="text" style={{ textAlign: 'center' }}>
                                    <h2 className="uppercase">Bông tai kim cương</h2>
                                </div>
                            </div>
                        </div>
                        <div id="col-250429594" className="col small-12 large-12">
                            <Box className="site-main">
                                <Grid container spacing={2}>
                                    {!dataBT || dataBT.length === 0 ? (
                                        <Typography variant="h5" style={{ textAlign: 'center' }}></Typography>
                                    ) : (
                                        dataBT.map((product) => (
                                            <ProductItem key={product.ProductID} product={product} />
                                        ))
                                    )}
                                </Grid>
                            </Box>
                        </div>
                        <div id="col-1533316930" className="col pb-0 small-12 large-12">
                            <div className="col-inner text-center">
                                <a href="/product/bt" className="button primary lowercase home-button" style={{ borderRadius: '5px' }}>
                                    <span>Xem thêm</span>
                                </a>
                            </div>
                        </div>

                        <div id="col-138763887" className="col small-12 large-12">
                            <div className="col-inner">
                                <div className="img has-hover x md-x lg-x y md-y lg-y" id="image_296087787" style={{ width: '100%' }}>
                                    <div className="img-inner dark">
                                        <img decoding="async" width="1020" height="355" src={SmallBanner} className="attachment-large size-large entered lazyloaded" alt="nhan nu Home Page" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="col-985727245" className="col small-12 large-12">
                            <div className="col-inner">
                                <div id="text-3803404377" className="text" style={{ textAlign: 'center' }}>
                                    <h2 className="uppercase">Dây chuyền kim cương</h2>
                                </div>
                            </div>
                        </div>
                        <div id="col-250429594" className="col small-12 large-12">
                            <Box className="site-main">
                                <Grid container spacing={2}>
                                    {!dataDC || dataDC.length === 0 ? (
                                        <Typography variant="h5" style={{ textAlign: 'center' }}></Typography>
                                    ) : (
                                        dataDC.map((product) => (
                                            <ProductItem key={product.ProductID} product={product} />
                                        ))
                                    )}
                                </Grid>
                            </Box>
                        </div>
                        <div id="col-1533316930" className="col pb-0 small-12 large-12">
                            <div className="col-inner text-center">
                                <a href="/product/dc" className="button primary lowercase home-button" style={{ borderRadius: '5px' }}>
                                    <span>Xem thêm</span>
                                </a>
                            </div>
                        </div>

                        <div id="col-138763887" className="col small-12 large-12">
                            <div className="col-inner">
                                <div className="img has-hover x md-x lg-x y md-y lg-y" id="image_296087787" style={{ width: '100%' }}>
                                    <div className="img-inner dark">
                                        <img decoding="async" width="1020" height="355" src={SmallBanner} className="attachment-large size-large entered lazyloaded" alt="nhan nu Home Page" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="col-985727245" className="col small-12 large-12">
                            <div className="col-inner">
                                <div id="text-3803404377" className="text" style={{ textAlign: 'center' }}>
                                    <h2 className="uppercase">Lắc tay, vòng tay kim cương</h2>
                                </div>
                            </div>
                        </div>
                        <div id="col-250429594" className="col small-12 large-12">
                            <Box className="site-main">
                                <Grid container spacing={2}>
                                    {!dataVT || dataVT.length === 0 ? (
                                        <Typography variant="h5" style={{ textAlign: 'center' }}></Typography>
                                    ) : (
                                        dataVT.map((product) => (
                                            <ProductItem key={product.ProductID} product={product} />
                                        ))
                                    )}
                                </Grid>
                            </Box>
                        </div>
                        <div id="col-1533316930" className="col pb-0 small-12 large-12">
                            <div className="col-inner text-center">
                                <a href="/product/vt" className="button primary lowercase home-button" style={{ borderRadius: '5px' }}>
                                    <span>Xem thêm</span>
                                </a>
                            </div>
                        </div>

                    </div>
                </div >
            </section >
            <Footer />
        </>
    );
}

export default Home;

