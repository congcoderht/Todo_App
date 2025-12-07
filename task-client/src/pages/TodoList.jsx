import { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { getAllTasks, createTask, updateTask, deleteTask } from '../api/TaskApi';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [hasDueDate, setHasDueDate] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, [filterStatus]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await getAllTasks(filterStatus);
      setTasks(response.data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newTask = {
        title: title.trim(),
        description: '',
        dueDate: hasDueDate && dueDate ? new Date(dueDate).toISOString() : null,
        isCompleted: false, // Mặc định là "Đang làm"
        isImportant: false
      };

      await createTask(newTask);
      setTitle('');
      setHasDueDate(false);
      setDueDate('');
      loadTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTask = async (task) => {
    try {
      await updateTask(task.id, task);
      setEditingTask(null);
      loadTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa task này?')) return;

    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    // Chuyển đổi status string thành boolean
    const isCompleted = newStatus === 'Hoàn thành';
    const updatedTask = { ...task, isCompleted };
    await handleUpdateTask(updatedTask);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Chuyển đổi isCompleted (boolean) thành status (string) để hiển thị
  const getStatusFromTask = (task) => {
    return task.isCompleted ? 'Hoàn thành' : 'Đang làm';
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Màn hình quản lý task cá nhân
        </h1>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập task mới..."
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="dueDateCheck"
                checked={hasDueDate}
                onChange={(e) => setHasDueDate(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="dueDateCheck" className="text-sm font-medium text-gray-700">
                Due-date
              </label>
            </div>
            {hasDueDate && (
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
          </div>
        </form>

        {/* Filter */}
        <div className="mb-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Đang làm">Đang làm</option>
            <option value="Hoàn thành">Hoàn thành</option>
          </select>
        </div>

        {/* Tasks Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Due-date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    Đang tải...
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    Không có task nào
                  </td>
                </tr>
              ) : (
                tasks.map((task) => {
                  const currentStatus = getStatusFromTask(task);
                  return (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingTask?.id === task.id ? (
                          <input
                            type="text"
                            value={editingTask.title}
                            onChange={(e) =>
                              setEditingTask({ ...editingTask, title: e.target.value })
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            onBlur={() => handleUpdateTask(editingTask)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleUpdateTask(editingTask);
                              } else if (e.key === 'Escape') {
                                setEditingTask(null);
                              }
                            }}
                            autoFocus
                          />
                        ) : (
                          <span className="text-sm font-medium text-gray-900">
                            {task.title}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(task.dueDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={currentStatus}
                          onChange={(e) => handleStatusChange(task, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${
                            currentStatus === 'Hoàn thành'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          <option value="Đang làm">Đang làm</option>
                          <option value="Hoàn thành">Hoàn thành</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              if (editingTask?.id === task.id) {
                                handleUpdateTask(editingTask);
                                setEditingTask(null);
                              } else {
                                setEditingTask({ ...task });
                              }
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
