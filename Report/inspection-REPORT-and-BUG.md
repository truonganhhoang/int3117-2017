							Ngày 16 tháng 10 năm 2017
				BIÊN BẢN HỌP KIỂM THỬ
	Hôm nay, lúc 11h ngày 16 tháng 10 năm 2017 tại phòng 701 tòa nhà E1 diễn ra cuộc họp với các nội dung sau:
	I/ Thành phần tham dự gồm:
		1. Chủ tịch : Trần Thanh Huyền
		2. Reader : Nguyễn Thị Lan, Nguyễn Thi Hồng Hải
		3. Reviewer : Nguyễn Văn Nhật , Nguyễn Thanh Bình
		4.Thư kí : Hoàng Thanh Hằng
	II/ Nội dung cuộc họp: 
	Cuộc họp diễn ra trong thời gian 30 phút, đã tìm ra một số lỗi tiềm tàng của hai team như sau
	1.	Team Report 
	Common TC_F_16
	Bug 1 : 
	- Reader Lan : 
		Trong trường hợp bảng chưa có dữ liệu, ca kiểm thử xóa không thành công.
		Nguyên nhân : Chưa xử lý trường hợp cơ sở dữ liệu trống
	- Reviewer Bình Đưa ra giải pháp :
 		Viết thêm trường hợp xử lý ngoại lệ
	- Chủ tịch : 
		Tính khả thi của giải pháp : 100%
		Thời gian xử lý bug : 1 ngày
		Phân công cho : Nguyễn Thanh Bình
	2.	Team BUG
	Common TC_F_27
	Bug 1 :
	- Reader Hải :  Chưa xử lý toàn diện để đảm bảo nhập tiếng việt không bị lỗi
	- Reviewer Nhật nêu nguyên nhân :
 		Chưa tìm ra giải pháp để viết testcase hiệu quả nhất
	- Chủ tịch và mọi người bàn và đưa ra giải pháp cuối cùng là :
 		Áp dụng kỹ thuật phân vùng tương đương , nhận thấy có một số vùng lỗi thể hiện là như nhau do đó chỉ cần 
		test một số trường hợp đại diện bao gồm :
		•	Câu toàn chữ không dấu abc
		•	Câu chứa chữ có dấu : ê đê
		•	Câu chứa chữ không dấu nhưng có thanh : hàng
		•	Cấu chứa chữ có dấu , có cả thanh : hử hể
		Tính khả thi : Test case này không đảm bảo bao phủ tuyệt đối nhưng có thể đảm bảo đúng được 80-90%
		Thời gian thực hiện : 1 ngày
		Phân công cho : Nguyễn Văn Nhật

	Cuộc họp kết thúc lúc 11h30 ngày 16 tháng 10 năm 2017.
		Thư kí cuộc họp						Chủ tịch
		Hoàng Thanh Hằng					Trần Thanh Huyền




