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

export default function NiSizePage() {

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
                            href="/cart"
                        >
                            Hướng dẫn cách đo ni nhẫn
                        </Link>
                    </Breadcrumbs>
                </div>
                <Box className="main-content-cart">
                    <Typography variant="h3" className="custom_blog_title" style={{ textAlign: 'center' }}>
                        HƯỚNG DẪN CÁCH ĐO NI NHẪN
                    </Typography>
                    <Box className="shoppingcart-content" sx={{ marginX: '120px' }}>
                        <TableContainer>
                            <Typography variant="body1" gutterBottom className="content">
                                Để biết rõ hơn về cách chọn nhẫn sao cho phù hợp nhất, bạn cần phải biết chu vi ngón tay của mình. So sánh thông số dưới bảng để biết được kích thước của nhẫn so với ngón tay. Dưới đây là bảng size nhẫn (đường kính trong mm) phổ biến để bạn dễ dàng tham khảo.
                            </Typography>

                            <Typography className="content" variant="body2" gutterBottom sx={{ fontStyle: 'italic', marginLeft: '20px', marginRight: '20px' }}>
                                Hiện nay có hai bảng size nhẫn phổ biến: Đó là bảng size được dùng tại Việt Nam và bảng size được dùng tại Mỹ. Tùy theo quốc gia đang cư trú mà bạn chọn bảng size phù hợp. Nhiều thương hiệu trang sức cũng thiết kế riêng bảng size nhẫn. Vì thế khi mua nhẫn, bạn nên nhờ nhân viên tư vấn cụ thể để chọn đúng size nhẫn vừa tay.
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <img src="https://caohungdiamond.com/wp-content/uploads/2022/09/bang-do-size-nhan.jpg" alt="Description of the image" style={{ maxWidth: '100%', height: 'auto' }} />
                            </Box>
                            <br />

                            <Typography className="content" variant="body1" gutterBottom>
                                Đo size nhẫn bằng giấy và thước
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <img src="https://caohungdiamond.com/wp-content/uploads/2022/09/do-size-nhan-bang-nhan.jpg" alt="Description of the image" style={{ maxWidth: '100%', height: 'auto' }} />
                            </Box>
                            <br />

                            <Typography className="content" variant="body1" gutterBottom>
                                Đo size nhẫn bằng chiếc nhẫn đã có
                            </Typography>

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

                            <Typography className="content" variant="h6" gutterBottom>
                                Những lưu ý khi tự đo size nhẫn tại nhà
                            </Typography>
                            <Typography className="content" variant="body1" style={{ margin: "1px 0 " }}>
                                1️⃣ Tìm hiểu về thú cưng bạn muốn nhận nuôi trên trang web của ANL
                            </Typography>
                            <Typography className="content" variant="body1" style={{ margin: "1px 0 " }}>
                                2️⃣ Liên hệ với Tình nguyện viên phụ trách bé để tìm hiểu thêm về bé.
                            </Typography>
                            <Typography className="content" variant="body1" style={{ margin: "1px 0 " }}>
                                3️⃣ Tham gia phỏng vấn nhận nuôi.
                            </Typography>
                            <Typography className="content" variant="body1" style={{ margin: "1px 0 " }}>
                                4️⃣ Chuẩn bị cơ sở vật chất, ký giấy tờ nhận nuôi và đóng tiền vía để đón bé về.
                            </Typography>
                            <Typography className="content" variant="body1" style={{ margin: "1px 0 " }}>
                                5️⃣ Thường xuyên cập nhật về tình hình của bé, đặc biệt là khi có sự cố để được tư vấn kịp thời.
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <img src="https://caohungdiamond.com/wp-content/uploads/2022/09/do-day-cua-nhan.jpg" alt="Description of the image" style={{ maxWidth: '100%', height: 'auto' }} />
                            </Box>
                            <br />

                            <Typography className="content" variant="body2" gutterBottom sx={{ fontStyle: 'italic', marginLeft: '20px', marginRight: '20px' }}>
                                Cần chú ý rằng, các lưu ý trên chỉ mang tính chất chung. Để có kết quả chính xác, bạn nên tham khảo ý kiến từ một chuyên gia có kinh nghiệm trong nghề hoặc đo kích thước tại cửa hàng trang sức uy tín.
                            </Typography>

                            <br />
                            <Typography className="content" variant="body1" gutterBottom>
                                Trên đây là toàn bộ thông tin hướng dẫn đo size nhẫn sao cho phù hợp với kích thước tay của mình một cách chuẩn nhất. Hy vọng bài viết có thể mang tới nhiều thông tin bổ ích dành cho bạn. Nếu bạn cần tìm địa chỉ mua nhẫn uy tín và chất lượng cao, hãy đến ngay với Cao Hùng Diamond.
                            </Typography>

                        </TableContainer>
                    </Box>
                </Box>
            </Container >
            <Footer />
        </>
    );
}
