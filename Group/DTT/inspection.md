1. Chủ tịch: Trần Thị Thơ
2. Tác giả: Chu Thị Thơm, Nguyễn Thị Phương Duyên
3. Reader: Chu Thị Thơm, Nguyễn Thị Phương Duyên
4. Review: Nguyễn Thị Phương Duyên, Trần Thị Thơ
5. Thư ký: Chu Thị Thơm

* Công việc của từng thành viên:
	- Chủ tịch: làm việc với tác giả để lên kế hoạch thanh tra, gửi tài liệu, chạy cuộc họp, theo sát với tác giả về việc tiếp tục thanh tra (thường là trưởng nhóm hoặc quản lý dự án).
	- Tác giả: cung cấp tài liệu thanh tra cho người kiểm duyệt, giải thích các tài liệu khi cần thiết, trả lời các câu hỏi, chịu trách nhiệm về việc làm lại dựa trên các ý kiến thanh tra.
	- Reader: rà soát mã và dừng lại cho ý kiến về đoạn đó.
	- Review: chuyên gia kỹ thuật cho tài liệu đang được thanh tra, Cung cấp ý kiến và câu hỏi.

* Kết quả đánh giá: 
- CommonTC_GUI - Kiểm tra text - email:
	CommonTC_G_40: Kiểm tra khi trường email là bắt buộc nhập
	CommonTC_G_41: Kiểm tra khi trường email là duy nhất
	CommonTC_G_42: Nhập vượt quá độ dài cho phép của trường dữ liệu trong CSDL 
	CommonTC_G_43: Kiểm tra xử lý bỏ dấu cách đầu và cuối email trước khi lưu vào database 
	CommonTC_G_44: Kiểm tra định dạng email 
--> Tốt: 
	+ Các test suite đều có số testcase là 2.
	+ Mức độ hoàn thành và tự động là 100%, bao phủ các trường hợp khá tốt.
	+ Test hoàn chỉnh hết các links, tài khoản.
--> Chưa tốt: 
	+ Vẫn còn mắc lỗi chuẩn convention, nên điều chỉnh lại.
	+ Test suite CommonTC_G_43 chưa hoàn thành 100%.

- Thêm mới bệnh nhân - Kiểm tra combo - box "Nghề nghiệp":
	THEMMOI_BN_33: Kiểm tra giá trị mặc định
	THEMMOI_BN_34: Kiểm tra số lượng và sắp xếp các giá trị trong combo
	THEMMOI_BN_35: Kiểm tra căn lề
	THEMMOI_BN_35: Kiểm tra thông tin không bắt buộc
	THEMMOI_BN_37: Kiểm tra chức năng tìm kiếm trên combo-box 
--> Tốt: 
	+ Các test suite đều có số lượng testcase ổn, đảm bảo.
	+ Mức độ hoàn thành và tự động là 100%, bao phủ các trường hợp khá tốt.
	+ Test hoàn chỉnh hết các links, tài khoản.
--> Chưa tốt:
	+ Test suite THEMMOI_BN_34 chỉ test được tài khoản của DOCTOR.
	+ Test suite THEMMOI_BN_37 chỉ hoàn thiện được 40% do không tìm được combo-box tìm kiếm.
