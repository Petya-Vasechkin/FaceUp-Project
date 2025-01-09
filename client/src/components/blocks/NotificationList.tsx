import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/notifications');
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);

    return (
        <div className="p-6">
            <div className="flex-col items-center mb-8">
                <Link to="/" className="bg-[#0095FF] hover:bg-[#0077CC] text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 text-sm" > Vytvořit nové </Link>
                <h1 className="text-3xl font-bold text-[#0A2540]">Seznam oznámení</h1>
            </div>
            <div className="space-y-4">
                {/* {notifications.map((notification: any) => (
                    <div key={notification.id} className="border p-4 rounded-xl">
                        <h2>{notification.sender_name}</h2>
                        <p>Věk: {notification.sender_age}</p>
                        <p>Kategorie: {notification.category}</p>
                    </div>
                ))} */}

                {notifications.map((notification: any) => (
                    <Link to={`/notification/${notification.id}`} key={notification.id}>
                        <div className="border p-4 rounded-xl hover:bg-gray-50 text-[#0A2540]">
                            <h2>{notification.sender_name}</h2>
                            <p>Věk: {notification.sender_age}</p>
                            <p>Kategorie: {notification.category}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NotificationList;
