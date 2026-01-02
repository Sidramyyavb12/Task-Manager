import { 
  Calendar, 
  User, 
  Clock, 
  MoreVertical,
  Edit,
  Trash2,
  Eye 
} from 'lucide-react';
import { formatDate, formatRelativeTime, isOverdue } from '../utils/helpers';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange, isManager }) => {
  const [showMenu, setShowMenu] = useState(false);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  };

  const priorityColors = {
    low: 'text-gray-600 dark:text-gray-400',
    medium: 'text-yellow-600 dark:text-yellow-400',
    high: 'text-orange-600 dark:text-orange-400',
    urgent: 'text-red-600 dark:text-red-400',
  };

  const priorityDots = {
    low: 'bg-gray-400',
    medium: 'bg-yellow-400',
    high: 'bg-orange-400',
    urgent: 'bg-red-500',
  };

  const overdue = task.status !== 'completed' && isOverdue(task.dueDate);

  return (
    <div className="card hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${priorityDots[task.priority]}`}></div>
            <span className={`text-xs font-medium uppercase ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 animate-slide-up">
              <Link
                to={`/tasks/${task._id}`}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </Link>
              
              {isManager && (
                <button
                  onClick={() => {
                    onEdit(task);
                    setShowMenu(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              )}
              
              {isManager && (
                <button
                  onClick={() => {
                    onDelete(task._id);
                    setShowMenu(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors text-left"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-3">
        <span className={`badge ${statusColors[task.status]}`}>
          {task.status.replace('-', ' ')}
        </span>
      </div>

      {/* Task Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <User className="w-4 h-4 mr-2" />
          <span>Assigned to: <span className="font-medium text-gray-900 dark:text-gray-100">{task.assignedTo?.name}</span></span>
        </div>

        {task.dueDate && (
          <div className={`flex items-center text-sm ${overdue ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
            <Calendar className="w-4 h-4 mr-2" />
            <span>Due: {formatDate(task.dueDate)}</span>
            {overdue && <span className="ml-2 text-xs">(Overdue)</span>}
          </div>
        )}

        <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
          <Clock className="w-4 h-4 mr-2" />
          <span>Created {formatRelativeTime(task.createdAt)}</span>
        </div>
      </div>

      {/* Status Change Buttons */}
      {task.status !== 'completed' && task.status !== 'cancelled' && (
        <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          {task.status === 'pending' && (
            <button
              onClick={() => onStatusChange(task._id, 'in-progress')}
              className="flex-1 btn-primary text-sm py-2"
            >
              Start Task
            </button>
          )}
          
          {task.status === 'in-progress' && (
            <button
              onClick={() => onStatusChange(task._id, 'completed')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm"
            >
              Complete
            </button>
          )}
        </div>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;