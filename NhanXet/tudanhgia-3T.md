# KIỂM THỬ VÀ ĐẢM BẢO CHẤT LƯỢNG PHẦN MỀM
## Bản tự đánh giá nhóm 3T
###  Thành viên - Chấm điểm

* Nguyễn Đức Thuần (nhóm trưởng): 10/10
* Phan Thị Hà Trang: 9/10
* Nguyễn Bá Tú: 9.5/10

### Đánh giá chi tiết theo từng bài tập

#### 1. Khóa học "Software Testing Fundamentals"
Các thành viên trong nhóm đều học và làm bài tập của từng tuần theo đúng yêu cầu, do có nhiều thuật ngữ tiếng Anh và từ ngữ chuyên ngành khó hiểu nên hơi vẫn mất thời gian học tập và dịch tài liệu.
Đều đã hoàn thành hết khóa học.
Mỗi tuần đều làm slide liên quan tới tuần học đó của khóa học.

#### 2. Bài tập kiểm thử Cypress
Xem mã nguồn các ca kiểm thử Cypress của nhóm 3T [tại đây](https://github.com/truonganhhoang/int3117-2017/tree/master/Group/3T)
Nhóm 3T được giao các ca kiểm thử sau:
- **CommonTC_G_7**:	Nút Collapse (Không có màn hình nào chứa nút collapse để test)
- **CommonTC_G_8**:	Nút Expand (Không có màn hình nào chứa nút Expand để test)
- **CommonTC_G_9**: Kiểm tra Grid (Ca kiểm thử 9.4 và 9.5 không thể tự động => test bằng tay)
- **CommonTC_G_10**: Kiểm tra cách đánh số các bản ghi
- **CommonTC_G_11**: Kiểm tra việc không hiển thị các liên kết khi số bản ghi nhỏ hơn 10
- **THEMMOI_BN_1**:	Kiểm tra màn hình ở trạng thái mặc định
- **THEMMOI_BN_2**:	Kiểm tra tổng thể giao diện màn hình (Kiểm thử bằng tay vì không thể tự động)
- **THEMMOI_BN_3**:	Kiểm tra thứ tự di chuyển trỏ trên màn hình khi nhấn phím Tab (Kiểm thử bằng tay vì không thể tự động, Cypress không cho nhập nút Tab)
- **THEMMOI_BN_4**:	Kiểm tra thứ tự con trỏ di chuyển ngược lại trên màn hình khi nhấn Shift-Tab (Kiểm thử bằng tay vì không thể tự động, Cypress không cho nhập nút shift-Tab)
- **THEMMOI_BN_5**:	Kiểm tra thực hiện chức năng chính của màn hình khi nhấn Enter

Các ca kiểm thử có thể thực hiện tự động đều được thực hiện 100% số ca kiểm thử có thể tạo ra trên tất cả các màn hình với các tài khoản đăng nhập khác nhau.

#### Phân công chi tiết
| Thành viên | Công việc |
|----------------|-----------------------------------------------|
| Nguyễn Đức Thuần 	| - CommonTC_G_9: 100 ca kiểm thử (trên tất cả các màn hình) </br> - THEMMOI_BN_5: 1 ca kiểm thử </br>|
| Phan Thị Hà Trang                 	| - CommonTC_G_10: 30 ca kiểm thử (trên tất cả các màn hình) |
| Nguyễn Bá Tú                     	| - THEMMOI_BN_1: 1 ca kiểm thử |

#### 3. Bài tập tìm hiểu công cụ SiteSpeed.io
* Video sản phẩm: https://youtu.be/4Ef34h-GlyQ
* Cả nhóm cùng thực hiện tìm hiểu và chạy thử công cụ Sitespeed.io
* Nguyễn Đức Thuần phụ trách làm video sản phẩm.

#### 4. Bài tập review mã nguồn
Nhóm 3T đã thực hiện việc review mã nguồn của nhóm MID, đã đưa ra các khuyết điểm trong mã nguồn cypress của nhóm MID và đã góp ý về cách sửa lỗi.
Chi tiết: [Bài tập review mã nguồn](https://github.com/truonganhhoang/int3117-2017/blob/master/Group/3T/README.md) 

#### 5. Bài tập kiểm thử hộp trắng
Mã nguồn công cụ của nhóm thực hiện: [GitHub](https://github.com/batu4404/js-data-flow-testing) 
Giới thiệu qua về công cụ và quá trình thực hiện  (chi tiết xem tại README.md tại link GitHub của công cụ)
- Công cụ được viết bởi ngôn ngữ Java, sau khi nhận đầu vào là mã nguồn file javascript, chúng tôi sử dụng một thư viện của Java đó là [Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino) để phân tích mã nguồn JS thành AST.
- Sau đó, công cụ sẽ xây dựng Control Flow Graph (CFG) từ AST
- Từ CFG, lấy ra các đường thi hành cụ thể tương ứng
- Đối với từng đường thi hành, lấy các ràng buộc theo từng tiêu chí, đưa ra file smt2 rồi đưa vào bộ giải (Z3 Solver) để sinh ra các ca kiểm thử tương ứng.
#### Phân công chi tiết
| Thành viên | Công việc |
|----------------|-----------------------------------------------|
| Nguyễn Đức Thuần 	| - Lấy các đường thi hành có thể có của chương trình javascript </br> - Xây dựng các ràng buộc cho các đường thi hành</br> - Tạo file .smt2 cho các ràng buộc và đưa vào bộ giải Z3 |
| Phan Thị Hà Trang                 	| - Viết giao diện của ứng dụng, thực hiện slides và báo cáo của công cụ |
| Nguyễn Bá Tú                     	| - Tạo AST từ mã nguồn </br> - Xây dựng CFG từ AST </br> - Lấy các đường thi hành có thể có của chương trình javascript |

#### 6. Khóa học ISTQB
Các thành viên trong nhóm đều học và thực hiện đầy đủ khóa học ISTQB và có chứng chỉ của khóa học.
