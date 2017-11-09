# BIÊN BẢN CUỘC HỌP
## Môn: Kiểm thử và đảm bảo chất lượng phần mềm

### I. Thành phần tham dự
* Chủ tịch: Đào Thị Mơ
* Người đọc: Phạm Thị Thu Hường, Vũ Thị Thùy
* Người phản biện: Nguyễn Thị Tú Anh, Hà Thị Hiện
* Thư ký: Nguyễn Thị Huệ

### II. Nội dung cuộc họp
	2 nhóm M2H và AHT review code chéo, các lỗi tìm được như sau:
### 1. M2H
#### Nhóm thực hiện: AHT
* Các common testcase chưa chạy được hết tất cả các màn hình, đôi lúc xảy ra lỗi làm chương trình dừng
	Nguyên nhân: Do cố định id của các selector
		VD: button.btn blue-custom btn-sm ng-binding

	Giải pháp: Kiểm tra việc lấy selector, tối ưu code trên các màn hình
* Cách đầu dòng chưa hợp lý 
* Một số dòng trắng thừa nên bỏ để code trong sáng hơn

### 2. AHT
#### Nhóm thực hiện: M2H
* Các common testcase chưa chạy được hết tất cả các màn hình
	Giải pháp: Kiểm tra việc lấy selector
* Phần THEMMOI_BN_20 chạy bị thừa một tùy chọn khi chỉ số index = 4.
* Một số dòng trắng thừa và đầu dòng chưa hợp lý.



### Tìm hiểu công cụ HIVE CI

#### Link giới thiệu: [YouTube](https://www.youtube.com/watch?v=IFkX4O7Pm5I&feature=youtu.be)
#### Link WebSite Document: [Hive Ci](http://bbc.github.io/hive-ci/)