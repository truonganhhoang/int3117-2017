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
  "email": "storekeeper_10@gmail.com",
  "password": "Methadone@2017",
  "urls": [
    {"path": "/main/situation_use", "form": ""},
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
    }
  }
}
```
Mỗi một người dùng sẽ có 1 tập các `urls` để test. Với mỗi `url`, định nghĩa các thông tin sau:
* `path`: Đường dẫn đến trang cần test.
* `form`: Chứa thông tin về form của input cần test (để thành `""` nếu không chứa input nào)

###Cấu trúc của Form
Mỗi một `form` sẽ gồm các thông tin sau:
* `modal`: (*optional*) Tên hàm gọi modal để hiện form. Nếu có thì code sẽ gọi mở modal trước rồi mới thực hiện kiểm thử.
* `action`: (*optional*) Danh sách các đối tượng **action**, chứa thông tin về các hành động sẽ thực hiện trên trang web trước khi thực hiện kiểm thử.
* `inputs`: (*required*) Danh sách các đối tượng **input**, định nghĩa về thông tin các đối tượng kiểm thử cùng với các testcase cần thực hiện.

#####action
Đối tượng chứa thông tin về hành động sẽ thực hiện trên trang web.
Cấu trúc:
* `type`: (*required*) Kiểu xử lí. Hiện tại có 3 giá trị:
    * `"input"`: Nhập text hoặc number.
    * `"select"`: Chọn giá trị trong thẻ **\<select>**.
    * `"check"`: Checkbox.
* `selector`: (*required*) DOM cần thực hiện (tương tự như JQuery).
\** Chú ý: Với kiểu `"select"` thì `selector` là thẻ **\<select>** hoặc thẻ chứa class **select2**.
* `value`: (*optional*) Giá trị cần nhập vào. Với mỗi `type` khác nhau thì giá trị nhập vào cũng khác nhau:
    * `"input"`: Nhập trực tiếp giá trị này vào `selector` (nếu nhập string vào input dạng number có thể bị mất).
    * `"select"`: Giá trị để code tìm kiếm trong các thẻ **\<option>**, nếu không tồn tại thì tự động chọn option đầu tiên.
(Nếu `value` không được khai báo thì với kiểu`"input"` sẽ nhập random 1 đoạn string độ dài từ 5-20 kí tự, còn `"select"` sẽ chọn giá trị đầu tiên).

#####input
Chứa thông tin của input cần test và các testcase.
Cấu trúc:
* `selector`: (*required*) tên của input cần test (tương tự JQuery).
* `action`: (*optional*) Danh sách các đối tượng **action**, chứa thông tin về các hành động sẽ chỉ thực hiện cho input hiện tại.
* `testcase`: (*required*) Thông tin về các testcase.

#####testcase
Đối tượng chưa danh sách định nghĩa các testcase:
```
"tên testcase 1": {
  "value": "giá trị đầu vào để test",
  "assert": "contain",
  "data": "Thông tin kiểm tra"
},
"tên testcase 2": {
  "value": "giá trị đầu vào để test",
  "assert": "exist",
  "selector": "dom cần kiểm tra"
},
...
```
* `assert`: Hiện tại đang có 3 kiểu kiểm tra:
    * `"contain"`: Kiểm tra xem trang web có chứa một thông tin gì đó không.
    * `"exist"`: Kiểm tra xem trang web có tồn tại một thông tin gì đó không.
    * `"not exist"`: Ngược lại với `"exist"`.
* `data` (dành cho`"contain"`): Thông tin cần kiểm tra thường sẽ là một đoạn text.
* `selector`(dành cho `"exist"`, `"not exist"`): Tên của DOM cần kiểm tra (tương tự JQuery).

Bên cạnh test với một giá trị đầu vào cho trước, cấu trúc này cũng cho phép test trong một khoảng giá trị (chỉ áp dụng cho input kiểu number):
```
"Range_Testcase1": {
  "min": 1,
  "max": 99999,
  "assert": "contain",
  "data": "Giá trị đầu vào sẽ random từ 1 => 99999"
}
```

Định nghĩa test case khi giá trị đầu vào phụ thuộc vào một giá trị của DOM nào đó:
```
"Common_TC_G_28": {
  "depend": "td[ng-bind-html='medicine.remaining_number']",
  "modify": 1,
  "assert": "contain",
  "data": "Giá trị đầu vào bị phụ thuộc vào một DOM nào đó."
},
```
* `depend`: tên của DOM mà input đang test hiện tại bị phụ thuộc.
* `modify`: (*optional*) Giá trị chênh lệch của input đang test hiện tại với giá trị của DOM đó. Nếu không được khai báo thì giá trị đầu vào của input chính là giá trị của DOM.

Phụ thuộc cũng có thể được định nghĩa ở trong `max` và `min` nếu khoảng giá trị của input bị ảnh hưởng bởi DOM khác:
```
"Common_TC_G_31": {
  "min": 1,
  "max": {
    "depend": "td[ng-bind-html='medicine.remaining_number']".
    "modify": -1
  },
  "assert": "contain",
  "data": "Tạo mới thành công"
},
```