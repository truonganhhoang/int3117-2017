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

## Thiết kế tệp Rules
Dưới đây là một ví dụ được định nghĩa cho ca kiểm thử cho trường số lượng thuốc trong form thêm phiếu xuất kho.

```
{
  "path": "/main/delivery_vouchers/143/medicines",
  "form": {
    "modal": "showCreateVoucherModal()",
    "action": [
      {
        "type": "input",
        "selector": "input[ng-model='new_voucher.sender']",
        "value": "Nguyễn A"
      },
      {
        "type": "input",
        "selector": "input[ng-model='new_voucher.receiver']",
        "value": "Nguyễn B"
      },
      {
        "type": "input",
        "selector": "input[ng-model='new_voucher.datee']",
        "value": "07/10/2017"
      },
      {"type": "select", "selector": "div[ng-model='medicine']", "value": "Buprenorphine"}
    ],
    "inputs": [
      {
        "selector": "input[ng-model='medicine.number']",
        "testcase": {
          "Common_TC_G_28": {
            "depend": "td[ng-bind-html='medicine.remaining_number - medicine.booking']",
            "modify": 1,
            "assert": "contain",
            "data": "Vui lòng nhập giá trị nhỏ hơn hoặc bằng"
          },
          "Common_TC_G_29": {
            "value": 0,
            "assert": "contain",
            "data": "Vui lòng nhập giá trị nhỏ hơn hoặc bằng"
          },
          "Common_TC_G_30": {
            "value": 1,
            "assert": "contain",
            "data": "Tạo mới thành công"
          },
          "Common_TC_G_31": {
            "min": 1,
            "max": {
              "depend": "td[ng-bind-html='medicine.remaining_number - medicine.booking']"
            },
            "assert": "contain",
            "data": "Tạo mới thành công"
          },
          "Common_TC_G_32": {
            "depend": "td[ng-bind-html='medicine.remaining_number - medicine.booking']",
            "assert": "contain",
            "data": "Tạo mới thành công"
          }
        }
      }
    ]
  }
}
```
