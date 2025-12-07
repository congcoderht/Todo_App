using TaskAPI.Models;
using TaskAPI.Repositories;

namespace TaskAPI.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _repository;

        public TaskService(ITaskRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync(bool? isCompleted = null)
        {
            if (isCompleted.HasValue)
            {
                return await _repository.GetByStatusAsync(isCompleted.Value);
            }
            return await _repository.GetAllAsync();
        }

        public async Task<TaskItem?> GetTaskByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<TaskItem> CreateTaskAsync(TaskItem task)
        {
            task.IsCompleted = false; // Mặc định là "Đang làm"
            task.CreatedAt = DateTime.Now;
            return await _repository.CreateAsync(task);
        }

        public async Task<TaskItem?> UpdateTaskAsync(int id, TaskItem task)
        {
            var existingTask = await _repository.GetByIdAsync(id);
            if (existingTask == null)
                return null;

            existingTask.Title = task.Title;
            existingTask.Description = task.Description ?? string.Empty;
            existingTask.DueDate = task.DueDate;
            existingTask.IsCompleted = task.IsCompleted;
            existingTask.IsImportant = task.IsImportant;

            return await _repository.UpdateAsync(existingTask);
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}

