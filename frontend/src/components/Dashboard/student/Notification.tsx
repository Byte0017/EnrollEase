import { List, Badge } from 'antd';

const Notification = () => {
  const notifications = [
    { id: 1, title: 'New Message', message: 'Your application has been received.', read: false },
    { id: 2, title: 'Deadline Reminder', message: 'Application fee payment due tomorrow.', read: true },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <List
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item>
            <Badge dot={!item.read}>
              <div className="p-4 bg-gray-50 rounded-lg w-full">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.message}</p>
              </div>
            </Badge>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Notification;