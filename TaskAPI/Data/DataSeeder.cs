using TaskAPI.Models;

namespace TaskAPI.Data
{
    public static class DataSeeder
    {
        public static void SeedData(AppDbContext context)
        {
            // Kiểm tra xem đã có dữ liệu chưa
            if (context.Tasks.Any())
            {
                return; // Đã có dữ liệu, không seed nữa
            }

            var tasks = new List<TaskItem>
            {
                new TaskItem
                {
                    Title = "Học React",
                    Description = "",
                    DueDate = new DateTime(2024, 4, 15),
                    IsCompleted = false, // "Đang làm"
                    IsImportant = false,
                    CreatedAt = DateTime.Now.AddDays(-5)
                },
                new TaskItem
                {
                    Title = "Đi chợ",
                    Description = "",
                    DueDate = new DateTime(2024, 4, 20),
                    IsCompleted = true, // "Hoàn thành"
                    IsImportant = false,
                    CreatedAt = DateTime.Now.AddDays(-3)
                },
                new TaskItem
                {
                    Title = "Dọn nhà",
                    Description = "",
                    DueDate = null, // Không có due date
                    IsCompleted = false, // "Đang làm"
                    IsImportant = false,
                    CreatedAt = DateTime.Now.AddDays(-1)
                }
            };

            context.Tasks.AddRange(tasks);
            context.SaveChanges();
        }
    }
}

