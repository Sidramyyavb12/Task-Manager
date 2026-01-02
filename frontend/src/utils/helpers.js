import { format, formatDistance, formatRelative } from 'date-fns';

export const formatDate = (date) => {
  if (!date) return 'N/A';
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateTime = (date) => {
  if (!date) return 'N/A';
  return format(new Date(date), 'MMM dd, yyyy HH:mm');
};

export const formatRelativeTime = (date) => {
  if (!date) return 'N/A';
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

export const formatRelativeDate = (date) => {
  if (!date) return 'N/A';
  return formatRelative(new Date(date), new Date());
};

export const getStatusColor = (status) => {
  const colors = {
    pending: 'yellow',
    'in-progress': 'blue',
    completed: 'green',
    cancelled: 'gray',
  };
  return colors[status] || 'gray';
};

export const getPriorityColor = (priority) => {
  const colors = {
    low: 'gray',
    medium: 'yellow',
    high: 'orange',
    urgent: 'red',
  };
  return colors[priority] || 'gray';
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};