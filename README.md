# Personal Task Manager

Ứng dụng quản lý task cá nhân được xây dựng với ASP.NET Core Web API và React.

## Công nghệ sử dụng

### Backend
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- Pomelo MySQL Provider
- Kiến trúc: Controller - Service - Repository

### Frontend
- React 19
- Vite
- Axios
- React Router DOM
- Tailwind CSS

### Database
- MySQL 8.0

## Cấu trúc dự án

```
221200440_TodoList/
├── TaskAPI/          # Backend API
│   ├── Controllers/
│   │   └── TaskController.cs
│   ├── Services/
│   │   ├── ITaskService.cs
│   │   └── TaskService.cs
│   ├── Repositories/
│   │   ├── ITaskRepository.cs
│   │   └── TaskRepository.cs
│   ├── Models/
│   │   └── TaskItem.cs
│   └── Data/
│       └── AppDbContext.cs
└── task-client/      # Frontend React
    └── src/
        ├── api/
        │   └── TaskApi.js
        └── pages/
            └── TodoList.jsx
```

## Hướng dẫn chạy ứng dụng

### 1. Cài đặt Database

Đảm bảo MySQL đã được cài đặt và đang chạy

### 2. Cấu hình Backend

1. Mở file `TaskAPI/appsettings.json` và kiểm tra connection string:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost;database=TodoListDB;user=root;password=041103"
  }
}
```

   **Lưu ý:** Thay đổi `password` nếu MySQL của bạn sử dụng password khác.


   Nếu chưa cài đặt EF Core tools:
```bash
dotnet tool install --global dotnet-ef
```

   **Lưu ý:** Ứng dụng sẽ tự động tạo database và seed dữ liệu mẫu khi chạy lần đầu (nếu database chưa có dữ liệu). Dữ liệu mẫu bao gồm:


1. Chạy API:
```bash
dotnet run
```

API sẽ chạy tại: `http://localhost:5268` (hoặc port được cấu hình trong `launchSettings.json`)

Swagger UI: `http://localhost:5268/swagger`

### 3. Cấu hình Frontend

1. Cài đặt dependencies:
```bash
cd task-client
npm install
```

2. Kiểm tra API URL trong `task-client/src/api/TaskApi.js`:
   - Mặc định: `http://localhost:5268/api/Task`
   - Nếu API chạy ở port khác, cập nhật URL tương ứng

3. Chạy ứng dụng:
```bash
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

### 4. Kiểm tra

- Truy cập `http://localhost:5173` để sử dụng ứng dụng
- Truy cập `http://localhost:5268/swagger` để xem và test API documentation
