# Bản tự đánh giá nhóm Dev's Nightmare
## 1. Tự đánh giá và chấm điểm thành viên trong nhóm.
- Bùi Quang Cường: 10/10
- Đinh Tiến Lộc 9.5/10
- Nguyễn Minh Hiếu: 9/10
## 2. Bài tập tự nghiên cứu trong khóa học coursers.edx.org
- Cả nhóm cùng hoàn thiện bài tập, chuẩn bị slide thuyết trình trước cả lớp.
#### Kết quả đạt được: nắm được kiến thức cơ bản về kiểm thử.

## 3. Tìm hiểu và viết testcase bằng công cụ Cypress: 
[Repo Cypress code](https://github.com/devnightmareuet/int3117-2017/tree/master/Group/DevNightmare)
Project không sử dụng hard code để tạo từng test case, mà sử dụng cấu trúc json để định nghĩa testcase.
- Bùi Quang Cường: Code phần Cypress chạy các testcase chính.
- Đinh Tiến Lộc: Xây dựng cấu trúc Json, cải thiện phần chạy code testcase chính.
- Nguyễn Minh Hiếu: xây dựng common, cải thiện phần chạy code testcase chính.

## 4. Tìm hiểu về công cụ TestNG.
Cả nhóm cùng hoạt động tìm hiểu về công cụ TestNG. Hiểu cơ bản về cách sử dụng framework, các chức năng chính của framework
- Bùi Quang Cường, Nguyễn Minh Hiếu: Hoàn thiện tài liệu, slide.
- Đinh Tiến Lộc: làm clip thuyết trình tại [Link](https://www.youtube.com/watch?v=VnHvy2G-yZc)

## 5. Khóa học ISTBQ.
- Cả nhóm đã nghiêm túc hoàn thành các câu hỏi và toàn bộ khóa học.
- Chứng chỉ được chụp và lưu [tại đây](https://github.com/devnightmareuet/int3117-2017/tree/master/istqb)

## 6. Thực hiện review code
- Hoàn thành đầy đủ tài liệu review, sửa lỗi khi nhận được cáo cáo lỗi.

## 7. Bài tập kiểm thử hộp trắng, kiểm thử luồng dữ liệu 1 hàm JavaScript.
- Các bước thực hiện: 
	1. Dùng thư viện [Rhino]https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino để parse ra cây AST.
	2. Dựng cây CFG từ AST.
	3. Dựng cây DFG từ cây CFG.
	4. Dùng symbolic execution để tạo hệ ràng buộc từ DFG
	5. Dùng [Z3 solver](https://rise4fun.com/z3/tutorial) để giải hệ có được từ bước 4.
- Tiến độ hoàn thành: 80%
- Phân chia công việc: 
	+ Đinh Tiến Lộc, Nguyễn Minh Hiếu: viết phần common, tìm thư viện và sinh cây AST.
	+ Bùi Quang Cường: Dựng các đồ thị, symbolic execution.
	+ Z3 solver: pending.
- [Source code] (https://github.com/devnightmareuet/int3117-2017/tree/master/Group/DevNightmare/jsdf-dataflowtesting)


