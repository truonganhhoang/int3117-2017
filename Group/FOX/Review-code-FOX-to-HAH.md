# Review code FOX to HAH
1. Thành viên tham gia kiểm thử:
	- Bùi Châu Anh
	- Trần Thị Hà
	- Trần Thị Thu Hường
2. Thành viên review
	- Mai Thanh Minh (Chủ tịch)
	- Nguyễn Thị Phương Anh (Thư kí)
	- Mai Thanh Minh (Kiểm tra)
3. Các kịch bản kiểm thử của nhóm HAH đã viết trên công cụ Cypress
# Kết quả
## Common_TC_GUI
### Kiểm tra checkbox
1. Kiểm tra giá trị mặc định của check box
	- Số testcase: 1
	- Trạng thái: Hoàn thành 100%
	- Tự động: 100%
2. Kiểm tra việc kích chọn, bỏ kích chọn trên các checkbox
	- Số testcase: 1
	- Trạng thái: Hoàn thành 100%
	- Tự động: 100%
	- Khiếm khuyết: Nên tách làm 2 test cho việc chọn và bỏ chọn
3. Kiểm tra việc kích chọn all check
	- Số testcase: 1
	- Trạng thái: Hoàn thành 100%
	- Tự động: 100%
4. Kiểm tra việc bỏ chọn 1 checkbox trong danh sách khi đang chọn check all
	- Số testcase: 1
	- Trạng thái: Hoàn thành 100%
	- Tự động: 100%
5. Kiểm tra việc kích chọn / bỏ chọn checkbox để bật ra 1 đối tượng khác
	- Số testcase: 1
	- Trạng thái: Hoàn thành 100%
	- Tự động: 100%
	- Khuyết điểm: Có 2 checkbox trong Thêm bệnh nhân. Thêm đơn thuốc nên tách ra làm 2 testcase
## Thêm mới bệnh nhân
### Kiểm tra combo - box "Tình hình tài chính"
1. Kiểm tra giá trị mặc định
	- Số testcase: 1
	- Trạng thái: Hoàn thành 100%
	- Tự động: 100%
2. Kiểm tra số lượng và sắp xếp các giá trị trong combo
	- Số testcase: 1
	- Trạng thái: Hoàn thành 100%
	- Tự động: 100%
	- Khuyết điểm: Sử dụng hardcode
3. Kiểm tra căn lề
	- Số testcase: 1
	- Trạng thái: Hoàn thành 100%
	- Tự động: 100%
4. Kiểm tra thông tin không bắt buộc
	- Số testcase: 1
	- Trạng thái: Hoàn thành 100%
	- Tự động: 100%
	- Khuyết điểm: Chưa random được họ và tên, chữ tiếng việt
### Textbox "Địa chỉ" - Thông tin người thân
1. Kiểm tra tìm kiếm các ký tự đặc biệt
	- Số testcase: 1
	- Trạng thái: Hoàn thành 100%
	- Tự động:90%
	- Khuyết điểm: Chưa random được kí tự đặc biệt
2. Kiểm tra nhập quá maxlength (? ký tự)
	- Không thấy viết testcase này do textbox không hỗ trợ việc tìm kiếm
3. Kiểm tra khi nhập dữ liệu là các thẻ html
	- Số testcase: 1
	- Trạng thái: Hoàn thành 100%
	- Tự động: 100%
4. Kiểm tra chức năng Trim space
	- Số testcase: 1
	- Trạng thái: Hoàn thành 100%
	- Tự động: 100%
5. Kiểm tra thực hiện thành công khi dữ liệu là chữ tiếng Việt có dấu
	- Số testcase: 1
	- Trạng thái: Hoàn thành 100%
	- Tự động: 90%
	- Khuyết điểm: chưa random được tiếng việt có dấu
# Nhận xét tổng thể
## Ưu điểm:
- Hoàn thành 100% các testcase khả thi
- Test đầy đủ về trường hợp tích cực và tiêu cực
- Code đúng convention
- Ngắn gọn và đầy đủ
## Khuyết điểm:
- Còn hard code trong testcase 147
- Các dữ liệu test chưa sát với thực tế
- Chưa random được tiếng việt có dấu
