Biên bản inspection
Nhóm NOMORE và HMN
===
## Thành viên
Nhóm NOMORE
- Xuân : Chủ tịch
- Duyên : reader
- Thu : reviewer
Nhóm HML
- Như : reader
- Mạnh: Thư ký
- Hà : reviewer

## Thảo luận code nhóm NOMORE
1. Xử lý upload ảnh
   Reader  : Vấn đề chọn sai định dạng ảnh thì báo lỗi
   Reviewer: Giải quyết của nhóm NOMORE:
   ```cypress
   it('Upload File - right way - should upload successfully', function(){
      cy.visit('/main/patients/421/edit')
	  cy.wait(delay)
	  cy.figture('images/TC.png').as("logo")
	  cy.get('input[type=file]').then(function(e1){
	     Cypress.Blob.base64StringToBlob(this.logo, 'image/png')
		 .then(blob => {
		    el[0].files[0] = blob
			cy.log(el[0].dispatchEvent(new Event('change', {bubbles:true, cancelabel:true})))
		 })
		 .catch(er => cy.log(er))
	  })
   })
   ```
   Không có giải pháp khác.
2. Vấn đề selecter
   Reader: Quyết định selecter như thế nào?
   Reviewer: Chọn các selecter theo thứ tự id, type, name
   Khả năng bảo trì : Có khả năng bảo trì.

## Thảo luận code nhóm HMN
1. Reader: Khó có khả năng bảo trì?
   Reviewer: Cần sửa chữa sử dụng thêm thư viện.
   Chủ tịch: Quyết định sửa.
   
