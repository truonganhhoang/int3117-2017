
# Bài tập tìm hiểu công cụ kiểm thử của nhóm 3T
* Công cụ tìm hiểu: [sitespeed.io](http://sitespeed.io)
* Youtube link: [https://youtu.be/4Ef34h-GlyQ](https://youtu.be/4Ef34h-GlyQ)

# Bài tập kiểm duyệt mã
### Nhóm thực hiện: 3T
## Các lỗi chung của tất cả các file kiểm thử
* Thừa các khoảng trắng không cần thiết, căn đầu dòng không đúng.
* Do cố định các id của các selector nên không test được nhiều màn hình.
* Thừa các dòng không cần thiết, ví dụ như các dòng `console.log` hay các dòng code không dùng mà comment lại.
* Đặt tên biến, tên hàm không có nghĩa.
### 1. File `CommonTC_G_86`
#### Vấn đề
* Phụ thuộc vào dữ liệu trên trang, nếu thay đổi dữ liệu hiển thị thì các selector sẽ không hoạt động đúng.
* Việc sinh dữ liệu kiểm thử không tự động
Ví dụ:
`cy.get('input.ng-valid-minlength').type('wwraghdbsvmsbvfsabjdhfkaligahglyagaskjhgwuggshagghsjhbvnbvjzshgdsgaiweghdsgahkrehf2/*#')`
### 2. File `THEMMOI_BN_91`
#### Vấn đề
* Do cố định các id của các selector nên không test được nhiều màn hình.
Ví dụ
`cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(3) > div:nth-child(1) > div > div.ui-select-container.select2.select2-container.ng-not-empty.ng-valid.ng-valid-required').should('contain',info.patient.province)`
### 2. File `THEMMOI_BN_95`
#### Vấn đề
* Các hàm `cy.get()` là các hàm bất đồng bộ, vì thế code trong ca kiểm thử này không đảm bảo sẽ thực hiện theo đúng trình tự mong muốn.
