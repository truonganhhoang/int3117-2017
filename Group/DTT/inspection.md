1. Chủ tịch: Trần Thị Thơ
2. Tác giả: Nguyễn Thị Phương Duyên
3. Reader: Bùi Châu Anh, Trần Thị Hà
4. Review: Nguyễn Thị Thu Hường, Nguyễn Thị Phương Duyên
5. Thư ký: Chu Thị Thơm

* Công việc của từng thành viên:
      - Chủ tịch: làm việc với tác giả để lên kế hoạch thanh tra, gửi tài liệu, chạy cuộc họp, theo sát với tác giả về việc tiếp tục thanh tra (thường là trưởng nhóm hoặc quản lý dự án).
      - Tác giả: cung cấp tài liệu thanh tra cho người kiểm duyệt, giải thích các tài liệu khi cần thiết, trả lời các câu hỏi, chịu trách nhiệm về việc làm lại dựa trên các ý kiến thanh tra.
      - Reader: rà soát mã và dừng lại cho ý kiến về đoạn đó.
      - Review: chuyên gia kỹ thuật cho tài liệu đang được thanh tra, Cung cấp ý kiến và câu hỏi.

* Nhóm HAH:
- CommonTC_GUI - Check box:
      CommonTC_G_56: Kiểm tra giá trị mặc định của check box
      CommonTC_G_57: Kiểm tra việc kích chọn, bỏ kích chọn trên các checkbox
      CommonTC_G_58: Kiểm tra việc kích chọn all check
      CommonTC_G_59: Kiểm tra việc bỏ chọn 1 checkbox trong danh sách khi đang chọn check all
      CommonTC_G_60: Kiểm tra việc kích chọn / bỏ chọn checkbox để bật ra 1 đối tượng khác
- Thêm mới bệnh nhân:
  + Kiểm tra combo - box "Tình hình tài chính":
      THEMMOI_BN_46: Kiểm tra giá trị mặc định
      THEMMOI_BN_47: Kiểm tra số lượng và sắp xếp các giá trị trong combo
      THEMMOI_BN_48: Kiểm tra căn lề
      THEMMOI_BN_49: Kiểm tra thông tin không bắt buộc
  + Textbox "Địa chỉ" - Thông tin người thân:
      THEMMOI_BN_153: Kiểm tra tìm kiếm các ký tự đặc biệt
      THEMMOI_BN_154: Kiểm tra nhập quá maxlength (? ký tự)
      THEMMOI_BN_155: Kiểm tra khi nhập dữ liệu là các thẻ html
      THEMMOI_BN_156: Kiểm tra chức năng Trim space
      THEMMOI_BN_157: Kiểm tra thực hiện thành công khi dữ liệu là chữ tiếng Việt có dấu

* Kết quả:
  1. Common_TC_GUI - check box: Các test suite đều chỉ có số testcase là 1, nên viết thêm testcase để  đảm bảo chắc chắn hơn. Trạng thái hoàn thành, tự động là 100%. Riêng testcase của testsuite "Kiểm tra việc kích chọn / bỏ chọn checkbox để bật ra 1 đối tượng khác" có 2 check box trong "Thêm bệnh nhân" và "Thêm đơn thuốc" phải tách thành 2 testcase độc lập nhau.
  2. Thêm mới bệnh nhân:
    - Kiểm tra combo - box "Tình hình tài chính": số testcase các test suite vẫn chỉ là 1, còn sử dụng hardcode trong "Kiểm tra số lượng và sắp xếp các giá trị trong combo" và chưa random được họ tên, tiếng việt trong "Kiểm tra thông tin không bắt buộc".
    - Textbox "Địa chỉ" - Thông tin người thân: số testcase các test suite vẫn là 1, mức độ tự động chưa đạt 100%. Test suite "Kiểm tra nhập quá maxlength" không viết testcase.

* Đánh giá tổng quan:
  - Đã hoàn thành các test suite khá khả quan, test đầy đủ, thỉnh thoảng code còn chưa chuẩn convention, nhưng ngắn gọn và độc lập.
  - Còn hardcode, có testcase chưa tự động hoàn toàn.




