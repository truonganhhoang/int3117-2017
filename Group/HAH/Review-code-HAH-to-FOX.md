# Review code FOX
1. Thành viên thực hiện kiểm thử:
	- Mai Thanh Minh
	- Nguyễn Thị Phương Anh
2. Thành viên tham gia review
	- Trần Thị Hà (Chủ Tịch)
	- Bùi Châu Anh (Thư kí)
	- Trần Thị Thu Hường (Kiểm tra)
3. Kịch bản kiểm thử nhóm FOX trên cypress
# Common_TC_GUI
## Text Area
1. Kiểm tra giá trị mặc định
	- Số lượng testcase: 1
	- Tự động: 100%
	- Hoàn thành: 100%
2.Kiểm tra dữ liệu bắt buộc
	- Số lượng testcase: 1
	- Tự động:100%
	- Hoàn thành: 90%
	- Khuyết điểm: Còn sử dụng công cụ random ký tự string nhưng chưa random được kí tự Tiếng Việt
3. Kiểm tra dữ liệu không được vượt quá maxlength
	- Số lượng testcase: 1
	- Tự động: 100%
	- Hoàn thành: 90%
	- Khuyết điểm: Chưa random được kí tự Tiếng Việt, Random kí tự còn máy móc chưa random được dữ liệu thực tiễn
4. Kiểm tra khi nhập dữ liệu là các ký tự đặc biệt, thẻ html
	- Số lượng testcase: 1
	- Tự động: 100%
	- Hoàn thành: 50%
	- Khuyết điểm: Gộp 2 testcase làm 1
	- Lời khuyên: Nên tách việc kiểm tra nhập liễu là các kí tự và  nhập dữ liệu là thẻ html thành 2 testcase khách nhau
5. Kiểm tra chức năng Trimspace
	- Số lượng testcase: 1
	- Tự động: 100%
	- Hoàn thành: 100%

# Thêm mới bệnh nhân
## Kiểm tra combo-box "Nghề Nghiệp"
1.Kiểm tra giá trị mặc định
	- Số lượng testcase: 1
	- Tự động: 100%
	- Hoàn thành: 100%
2.Kiểm tra số lượng vá sắp xếp các giá trị trong combo
	- Số lượng testcase: 1
	- Tự động: 100%
	- Hoàn thành: 100%
3. Kiểm tra căn lề
	- Số lượng testcase: 1
	- Tự động: 100%
	- Hoàn thành: 100%
4. Kiểm tra thông tin không bắt buộc
	- Số lượng testcase: 1
	- Tự động: 80%
	- Hoàn thành: 100%
	- Khuyết điểm: Chưa random được tiếng Việt. Chưa tự động được phần điền họ tên
## Kiểm tra combo-box "Mối quan hệ" - Thông tin người thân
1. Kiểm tra giá trị mặc định
	- Số lượng testcase: 1
	- Tự động: 100%
	- Hoàn thành: 100%
2. Kiểm tra số lượng và sắp xếp các giá trị trong  combo
	- Số lượng testcase: 1
	- Tự động: 100%
	- Hoàn thành: 100%
3. Kiểm tra căn lề
	- Số lượng testcase: 1
	- Tự động: 100%
	- Hoàn thành: 100%
4. Kiểm tra thông tin bắt buộc
	- Số lượng testcase: 1
	- Tự động: 80%
	- Hoàn thành: 100%
	- Khuyết điểm: Chưa random được tiếng Việt. Chưa tự động được phần điền họ tên
# Nhận xét code
## Ưu điểm
- Không harhcode
- Code đúng convention
- Hoàn thành đủ số lượng testcase đã giao
## Khuyết điểm
- Chưa random được thông tin cần điền Tiếng Việt
- Random các dữ liệu chưa đúng thực tiễn
- Còn gộp testcase
- Chưa test được các trường hợp tiêu cực (sai) của các testcase
