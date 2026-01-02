require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Task = require('./src/models/Task');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create demo users
    const manager = await User.create({
      name: 'John Manager',
      email: 'manager@demo.com',
      password: 'password123',
      role: 'manager',
    });

    const user1 = await User.create({
      name: 'Jane User',
      email: 'user@demo.com',
      password: 'password123',
      role: 'user',
    });

    const user2 = await User.create({
      name: 'Bob Developer',
      email: 'developer@demo.com',
      password: 'password123',
      role: 'user',
    });

    console.log('✅ Created demo users');

    // Create demo tasks
    const tasks = [
      {
        title: 'Setup Development Environment',
        description: 'Install Node.js, MongoDB, and configure the project',
        status: 'completed',
        priority: 'high',
        dueDate: new Date('2024-01-15'),
        assignedTo: user1._id,
        createdBy: manager._id,
        tags: ['setup', 'environment'],
      },
      {
        title: 'Design Database Schema',
        description: 'Create the database schema for users, tasks, and activity logs',
        status: 'completed',
        priority: 'high',
        dueDate: new Date('2024-01-16'),
        assignedTo: user1._id,
        createdBy: manager._id,
        tags: ['database', 'design'],
      },
      {
        title: 'Implement Authentication API',
        description: 'Build JWT-based authentication with login and signup endpoints',
        status: 'in-progress',
        priority: 'urgent',
        dueDate: new Date('2024-01-20'),
        assignedTo: user1._id,
        createdBy: manager._id,
        tags: ['backend', 'auth', 'api'],
      },
      {
        title: 'Create Task Management UI',
        description: 'Build React components for task creation, editing, and viewing',
        status: 'in-progress',
        priority: 'high',
        dueDate: new Date('2024-01-22'),
        assignedTo: user2._id,
        createdBy: manager._id,
        tags: ['frontend', 'react', 'ui'],
      },
      {
        title: 'Implement Real-time Updates',
        description: 'Integrate Socket.io for real-time task updates across clients',
        status: 'pending',
        priority: 'medium',
        dueDate: new Date('2024-01-25'),
        assignedTo: user1._id,
        createdBy: manager._id,
        tags: ['backend', 'websocket', 'realtime'],
      },
      {
        title: 'Add Dark Mode Support',
        description: 'Implement theme toggle and dark mode styling across the application',
        status: 'completed',
        priority: 'low',
        dueDate: new Date('2024-01-18'),
        assignedTo: user2._id,
        createdBy: manager._id,
        tags: ['frontend', 'ui', 'theme'],
      },
      {
        title: 'Write API Documentation',
        description: 'Document all API endpoints with request/response examples',
        status: 'pending',
        priority: 'medium',
        dueDate: new Date('2024-01-28'),
        assignedTo: user1._id,
        createdBy: manager._id,
        tags: ['documentation', 'api'],
      },
      {
        title: 'Implement Pagination',
        description: 'Add pagination to task lists for better performance with large datasets',
        status: 'completed',
        priority: 'medium',
        dueDate: new Date('2024-01-19'),
        assignedTo: user2._id,
        createdBy: manager._id,
        tags: ['frontend', 'optimization'],
      },
      {
        title: 'Add Rate Limiting',
        description: 'Implement rate limiting middleware to prevent API abuse',
        status: 'completed',
        priority: 'high',
        dueDate: new Date('2024-01-17'),
        assignedTo: user1._id,
        createdBy: manager._id,
        tags: ['backend', 'security'],
      },
      {
        title: 'Create Activity Logging System',
        description: 'Track and log all task changes with user attribution',
        status: 'completed',
        priority: 'medium',
        dueDate: new Date('2024-01-21'),
        assignedTo: user1._id,
        createdBy: manager._id,
        tags: ['backend', 'logging'],
      },
      {
        title: 'Mobile Responsive Design',
        description: 'Ensure all pages are fully responsive on mobile devices',
        status: 'in-progress',
        priority: 'high',
        dueDate: new Date('2024-01-24'),
        assignedTo: user2._id,
        createdBy: manager._id,
        tags: ['frontend', 'responsive', 'mobile'],
      },
      {
        title: 'User Testing and Bug Fixes',
        description: 'Conduct thorough testing and fix any discovered bugs',
        status: 'pending',
        priority: 'urgent',
        dueDate: new Date('2024-01-30'),
        assignedTo: user2._id,
        createdBy: manager._id,
        tags: ['testing', 'bugs', 'qa'],
      },
    ];

    await Task.insertMany(tasks);
    console.log('✅ Created demo tasks');

    console.log('\n========================================');
    console.log('✅ Database seeded successfully!');
    console.log('========================================');
    console.log('\nDemo Accounts:');
    console.log('----------------------------');
    console.log('Manager:');
    console.log('  Email: manager@demo.com');
    console.log('  Password: password123');
    console.log('\nUser 1:');
    console.log('  Email: user@demo.com');
    console.log('  Password: password123');
    console.log('\nUser 2:');
    console.log('  Email: developer@demo.com');
    console.log('  Password: password123');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

connectDB().then(seedData);