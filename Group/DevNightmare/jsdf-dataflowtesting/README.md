# Công cụ sinh ca kiểm thử tự động dựa trên luồng dữ liệu cho Javascript

## Yêu cầu môi trường
- Java 8 trở lên
- Maven 3 trở lên

## Chức năng các phần mã nguồn
1. **net.bqc.jsdf.core.CFGenerator**: Bộ sinh đồ thị luồng điều khiển (CFG) cho mã nguồn, tìm tất cả các đường đi 
từ điểm đầu (Entry) đến điếm cuối (Exit) thông qua hàm *getGraphPaths()*
2. **net.bqc.jsdf.core.ast.CFNodeVisitor**: Bộ duyệt AST, tiền xử lý cho **CFGenerator**
3. **net.bqc.jsdf.core.df.DFGenerator**: Bộ sinh đồ thị luồng dữ liệu thỏa mãn các tiêu chí trong kiểm thử luồng dữ liệu,
sử dụng đầu vào là CFG và danh sách đường đi được sinh bởi **CFGenerator**

## Cài đặt và sử dụng
```
mvn clean install
```

Công cụ đang trong quá trình phát triển, hiện tại chúng tôi đã hoàn thành xong bộ xây dựng đồ thị luồng điều khiển 
cho mã nguồn chứa các câu lệnh đơn, câu lệnh if-else và while. Các thông tin sẽ được cập nhật tại đây!

Để kiểm tra bộ sinh CFG, hãy xem qua và chạy thử drive được viết bằng JUnit sau
```
net.bqc.jsdf.core.TestCFGenerator
```

## Đóng góp
Phần mềm tốt dù tốt đến đâu cũng không thể không có bug. Nếu bạn phát hiện vấn đề nào trong mã nguồn hoặc muốn đóng góp
những đoạn mã nguồn tốt hơn, đừng ngần ngại tạo các Issue hoặc Pull request. Chúng tôi sẽ rất vui khi nhận được chúng!