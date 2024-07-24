import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Breadcrumbs,
    Link,
    Typography,
    TableContainer,
} from "@mui/material";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Margin } from "@mui/icons-material";
import './common.css';

export default function IntroductionPage() {

    return (
        <>
            <Header />
            <Container
                sx={{ position: "relative", top: "20px", marginBottom: "150px" }}
            >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Breadcrumbs
                        aria-label="breadcrumb" sx={{ color: "#ffffff" }}
                    >
                        <Link
                            underline="hover"
                            sx={{ display: "flex", alignItems: "center" }}
                            color="#ffffff"
                            href="/"
                        >
                            Trang chủ
                        </Link>
                        <Link
                            underline="hover"
                            sx={{ display: "flex", alignItems: "center" }}
                            color="#ffffff"
                            href="/Introduction"
                        >
                            Giới thiệu
                        </Link>
                    </Breadcrumbs>
                </div>
                <Box className="main-content-cart">
                    <Typography variant="h3" className="custom_blog_title" style={{ textAlign: 'center' }}>
                        Giới thiệu
                    </Typography>
                    <Box className="shoppingcart-content" sx={{ marginX: '120px' }}>
                        <TableContainer>
                            <Typography variant="body1" gutterBottom className="content">
                                Được thành lập và dẫn dắt bởi ..........., ........ đã được biết đến là một trong các thương hiệu uy tín tại thành phố Hồ Chí Minh chuyên cung cấp trang sức kim cương chất lượng, GIÁ RẺ cho cả nam và nữ, được nhiều khách hàng tin tưởng lựa chọn.
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <img src="https://caohungdiamond.com/wp-content/uploads/2022/09/bang-do-size-nhan.jpg" alt="Description of the image" style={{ maxWidth: '100%', height: 'auto' }} />
                            </Box>
                            <br />

                            <Typography variant="h3" className="custom_blog_title">
                                Quá trình hình thành và phát triển
                            </Typography>

                            <Typography className="content" variant="body1" gutterBottom>
                                ........ hình thành giữa thời buổi nền kinh tế của đất nước mở cửa và có sự phát triển mạnh mẽ. Nhu cầu của con người đối với cuộc sống ngày càng cao. Giờ đây ngoài ẩm thực, thời trang thì rất nhiều người còn quan tâm tới cả trang sức, đặc biệt là trang sức cao cấp làm từ kim cương.
                            </Typography>

                            <Typography className="content" variant="body1" gutterBottom>
                                Tại thị trường Việt Nam cũng có không ít đơn vị đang kinh doanh lĩnh vực này. Tuy nhiên, mẫu mã sản phẩm còn chưa quá đa dạng, giá bán lại chênh lệch hỗn loạn. Là những người yêu và có sự am hiểu về trang sức kim cương, mong muốn được mang tới cho khách hàng những mẫu trang sức không chỉ cao cấp, đẹp, sang trọng, thời thượng mà còn là giá thành thấp, rẻ hơn so với thị trường nên chúng tôi đã thành lập nên .........                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <img src="https://caohungdiamond.com/wp-content/uploads/2022/09/do-size-nhan-bang-nhan.jpg" alt="Description of the image" style={{ maxWidth: '100%', height: 'auto' }} />
                            </Box>
                            <br />

                            <Typography className="content" variant="body1" gutterBottom>
                                Tại .... khách hàng không chỉ có thể tìm được cho mình cho mình rất nhiều mẫu trang sức kim cương đẹp và chất lượng, bảo đảm 100% thật, có giấy kiểm định quốc tế do GIA và IGI cấp. Ngoài trang sức kim cương dành cho phái đẹp thì chúng tôi còn mang tới cả các sản phẩm để phục vụ cho phái mạnh.
                            </Typography>

                            <Typography className="content" variant="body1" gutterBottom>
                            Mặc dù ban đầu ........ chỉ là một địa chỉ kinh doanh lẻ nhưng sau nhiều năm không ngừng nỗ lực, hiện chúng tôi không chỉ trở thành địa chỉ bán trang sức kim cương chính hãng, uy tín mà còn là đơn vị phân phối trang sức kim cương cho rất nhiều cửa hàng trang sức đang hoạt động tại TPHCM và các tỉnh thành khác. Bên cạnh đó, với nguồn kim cương lớn được nhập khẩu từ Hồng Kông, ........ tự tin đáp ứng mọi nhu cầu, thị hiếu của khách hàng từ mẫu mã cho đến giá thành hấp dẫn nhất Sài Gòn.                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <img src="https://caohungdiamond.com/wp-content/uploads/2022/09/do-size-nhan-bang-giay-va-thuoc.jpg" alt="Description of the image" style={{ maxWidth: '100%', height: 'auto' }} />
                            </Box>
                            <br />

                            <Typography className="content" variant="body1" gutterBottom>
                                Đo size nhẫn bằng tiền
                            </Typography>

                            <br />
                            <Typography className="content" variant="body1" gutterBottom>
                                Bạn cần chuẩn bị một tờ tiền polymer có mệnh giá bất kỳ và một chiếc nhẫn có sẵn đeo vừa tay bạn. Sau đó, bạn đặt tờ tiền trên một mặt phẳng, rồi đặt chiếc nhẫn sao cho trùng với đường viền của con số 0 trên tờ tiền. Cuối cùng, bạn chụp ảnh và gửi cho cửa hàng trang sức. Từ đó, họ có thể biết được size nhẫn của bạn là bao nhiêu và giúp bạn đưa ra sự lựa chọn chính xác.
                            </Typography>
                            <br />
                            <Typography className="content" variant="body1" gutterBottom>
                                Bảng Ni nhẫn theo cân nặng, chiều cao Nam và Nữ
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <img src="https://caohungdiamond.com/wp-content/uploads/2022/09/do-size-nhan-theo-chieu-cao-can-nang.jpg" alt="Description of the image" style={{ maxWidth: '100%', height: 'auto' }} />
                            </Box>
                            <br />


                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <img src="https://caohungdiamond.com/wp-content/uploads/2022/09/do-day-cua-nhan.jpg" alt="Description of the image" style={{ maxWidth: '100%', height: 'auto' }} />
                            </Box>
                            <br />

                            <Typography className="content" variant="body2" gutterBottom sx={{ fontStyle: 'italic', marginLeft: '20px', marginRight: '20px' }}>
                                Cần chú ý rằng, các lưu ý trên chỉ mang tính chất chung. Để có kết quả chính xác, bạn nên tham khảo ý kiến từ một chuyên gia có kinh nghiệm trong nghề hoặc đo kích thước tại cửa hàng trang sức uy tín.
                            </Typography>

                            <br />
                            <Typography className="content" variant="body1" gutterBottom>
                                Trên đây là toàn bộ thông tin hướng dẫn đo size nhẫn sao cho phù hợp với kích thước tay của mình một cách chuẩn nhất. Hy vọng bài viết có thể mang tới nhiều thông tin bổ ích dành cho bạn. Nếu bạn cần tìm địa chỉ mua nhẫn uy tín và chất lượng cao, hãy đến ngay với .........
                            </Typography>

                        </TableContainer>
                    </Box>
                </Box>
            </Container >
            <Footer />
        </>
    );
}
