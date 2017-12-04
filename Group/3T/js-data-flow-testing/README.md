# KIỂM THỬ VÀ ĐẢM BẢO CHẤT LƯỢNG PHẦN MỀM
## Công cụ kiểm thử hộp trắng của nhóm 3T
Trong folder này chỉ chứa mã nguồn của công cụ, chủ yếu sử dụng để xem thuật toán và các module. Để sử dụng được công cụ, chúng ta cần có các gói cài đặt cần thiết. Các gói cài đặt và hướng dẫn cài đặt có tại GitHub của nhóm 3T
GitHub của công cụ: [GitHub](https://github.com/batu4404/js-data-flow-testing) 
Giới thiệu qua về công cụ và quá trình thực hiện  
- Công cụ được viết bởi ngôn ngữ Java, sau khi nhận đầu vào là mã nguồn file javascript, chúng tôi sử dụng một thư viện của Java đó là [Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino) để phân tích mã nguồn JS thành AST.
- Sau đó, công cụ sẽ xây dựng Control Flow Graph (CFG) từ AST
- Từ CFG, lấy ra các đường thi hành cụ thể tương ứng
- Đối với từng đường thi hành, lấy các ràng buộc theo từng tiêu chí, đưa ra file smt2 rồi đưa vào bộ giải (Z3 Solver) để sinh ra các ca kiểm thử tương ứng.
