# Tên đề tài: Homefit ai

**Tên trang đã thực hiện:** Quản lý Tài khoản & Phân quyền (Admin Dashboard)

## 1. Mục đích của trang
Trang web được xây dựng để cung cấp một không gian làm việc chuyên nghiệp, giúp Quản trị viên (Admin) dễ dàng kiểm soát quyền truy cập, quản lý thông tin, theo dõi lịch sử hoạt động và cấp quyền cho các nhân sự (Quản trị viên khác và Kiểm duyệt viên) trong hệ thống.

## 2. Các chức năng chính (Tương tác JavaScript)
* **Render dữ liệu động:** Tự động đổ danh sách nhân sự (Quản trị viên, Kiểm duyệt viên) từ mảng đối tượng JavaScript ra giao diện HTML.
* **Xem chi tiết hồ sơ:** Click vào từng nhân sự trong danh sách để xem thông tin chi tiết, quyền hạn và lịch sử thao tác.
* **Thêm nhân sự mới:** Form nhập liệu cho phép tạo tài khoản nhân sự mới và tự động cập nhật vào danh sách bên phải mà không cần tải lại trang.
* **Cập nhật thông tin:** Cho phép chỉnh sửa thông tin, thay đổi phân quyền của nhân sự đang chọn và lưu lại.
* **Xóa/Loại bỏ nhân sự:** Nút loại bỏ nhân sự kèm theo hộp thoại xác nhận (confirm), tự động xóa khỏi danh sách khi đồng ý.
* **Form Validation:** Bắt lỗi các trường bắt buộc nhập (Họ tên, Lý do thao tác) và hiển thị thông báo lỗi màu đỏ khi submit.
* **Toggle/Accordion:** Nút đóng/mở (hiện/ẩn) phần "Lịch sử thao tác nhân sự" và popup mini chứa thông tin cá nhân của người đang đăng nhập.

## 3. Công nghệ sử dụng
* **HTML5:** Sử dụng cấu trúc Semantic HTML (`<aside>`, `<nav>`, `<header>`, `<main>`, `<section>`, `<form>`).
* **CSS3:** Bố cục Flexbox/Grid, biến CSS (Variables), hiệu ứng chuyển động mượt mà (transition/hover) và Responsive Design (Media queries) hỗ trợ trên nhiều kích thước màn hình.
* **JavaScript (Vanilla):** Xử lý DOM (DOM Manipulation), lắng nghe sự kiện (Event Listeners), thao tác với Mảng/Đối tượng (Array/Object). Không sử dụng thư viện bên ngoài.

## 4. Các liên kết (Links)
* **Link Figma:** https://www.figma.com/proto/Cj1buthUhvqMWrCSWhMjR6/Untitled?node-id=4-23203&p=f&t=c3zbnQmibP7hv98a-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1
* **Link GitHub:** https://github.com/DrSenkoFox/CSE122-GK-SV-NguyenChiTam-Accessmanagement
* **Link Video:** https://youtu.be/3CYu-Qz-lho
