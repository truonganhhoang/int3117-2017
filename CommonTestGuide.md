# Test script cho các ca kiểm thử chứa trường kiểu số

## Yêu cầu bài toán và hướng giải quyết
Viết test script để có thể kiểm thử tất cả các trường kiểu số ở tất cả các form trong tất cả các màn hình.

Việc phát hiện các trường kiểu số trong form thì dễ nhưng để kiểm thử tự động hoàn toàn bằng tay thì ta cần sinh dữ liệu
test. Việc này rất khó bởi vì mỗi trường kiểu số trong mỗi ngữ cảnh sẽ có các giá trị biên khác nhau, chưa kể đến việc sinh dữ 
liệu cho các trường khác cùng form cũng rất khó.
 
Giải pháp đề ra là ta vẫn cần thực hiện việc mô tả từng ca kiểm thử bằng tay nhưng ta sẽ cố gắng giảm thiểu công sức viết 
code nhất có thể. Bởi vì đây là những ca kiểm thử có các thao tác mang tính lặp đi lặp lại, và có thể tái sử dụng được. 
Ta sẽ tách thành hai phần là test script và các tệp rules. Test script là phần code để thực thi chung, sẽ được sử dụng
nhiều lần cho tất cả các ca kiểm thử; tệp rules là tệp định nghĩa các rules cho các ca kiểm thử đó được viết bằng Json. 
Như vậy mỗi lần ta muốn thêm ca kiểm thử mới, ta không cần phải chỉnh sửa hoặc viết lại mã nguồn và chỉ cần định nghĩa
ca kiểm thử mới vào các tệp rules.   


## Yêu cầu về Test Script
- Dễ hiểu và dễ làm
- Khả năng tái sử dụng code cao, viết ít code nhất có thể bởi vì càng ít code càng ít lỗi
- Dễ sửa đổi, bảo trì và mở rộng

## Yêu cầu về các tệp Rules
- Có cấu trúc thiết kế *"đủ trừu tượng"* để phù hợp với nhiều loại tiêu chí kiểm tra (assert) của tất cả các ca kiểm thử

## Cách thực hiện
1.
2.
3.