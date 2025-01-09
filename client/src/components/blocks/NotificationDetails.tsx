import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Notification {
    id: number;
    sender_name: string;
    sender_age: number;
    category: string;
    details: string;
    file_url?: string;
}

const NotificationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notification, setNotification] = useState<Notification | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<Notification | null>(null);

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/notifications/${id}`);
                const data = await response.json();
                setNotification(data);
                setEditedData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchNotification();
    }, [id]);

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:3001/api/notifications/${id}`, {
                method: 'DELETE'
            });
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/notifications/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData)
            });
            const data = await response.json();
            setNotification(data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-6">
            {notification && !isEditing ? (
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-[#0A2540]">Detail oznámení</h1>
                    <div className="border p-4 rounded-xl text-[#0A2540]">
                        <p>Jméno: {notification.sender_name}</p>
                        <p>Věk: {notification.sender_age}</p>
                        <p>Kategorie: {notification.category}</p>
                        <p>Detaily: {notification.details}</p>
                        {notification.file_url && (
                            <p>Soubor: {notification.file_url}</p>
                        )}
                        <div className="mt-4 space-x-4">
                            <button onClick={handleEdit} className="bg-[#0095FF] hover:bg-[#0077CC] text-white font-medium py-2 px-4 rounded-xl text-sm"> Upravit </button>
                            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl text-sm"> Smazat </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-[#0A2540]">Upravit oznámení</h1>
                    <div className="border p-4 rounded-xl">
                        <div className="mb-4">
                            <label className="block text-[#4F6C8D] mb-2 text-sm">Jméno</label>
                            <input
                                type="text"
                                value={editedData?.sender_name} onChange={(e) => setEditedData({ ...editedData!, sender_name: e.target.value })}
                                className="w-full p-3 border border-[#E5E9F2] rounded-xl text-[#0A2540] text-sm" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-[#4F6C8D] mb-2 text-sm">Věk</label>
                            <input
                                type="number"
                                value={editedData?.sender_age} onChange={(e) => setEditedData({ ...editedData!, sender_age: Number(e.target.value) })}
                                className="w-full p-3 border border-[#E5E9F2] rounded-xl text-[#0A2540] text-sm" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-[#4F6C8D] mb-2 text-sm">Soubor</label>
                            <div className="space-y-2">
                                <label className="w-full p-3 rounded-xl text-white font-medium bg-[#0095FF] hover:bg-[#0077CC] transition-all duration-200 flex items-center justify-center cursor-pointer text-sm">
                                    <input
                                        type="file"
                                        className="hidden" onChange={(e) => { const fileName = e.target.files?.[0]?.name || ''; setEditedData({ ...editedData!, file_url: fileName }); }}/>
                                    <span>Vybrat soubor</span>
                                </label>
                                {editedData?.file_url && (
                                    <div className="text-sm text-[#4F6C8D] pl-2">
                                        Vybraný soubor: {editedData.file_url}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-[#4F6C8D] mb-2 text-sm">Kategorie</label>
                            <select
                                value={editedData?.category} onChange={(e) => setEditedData({ ...editedData!, category: e.target.value })}
                                className="w-full p-3 border border-[#E5E9F2] rounded-xl text-[#0A2540] text-sm">
                                <option value="sikana">Šikana, špatné chování</option>
                                <option value="uceni">Potíže s učením</option>
                                <option value="problemy">Problémy doma</option>
                                <option value="jine">Něco jiného</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-[#4F6C8D] mb-2 text-sm">Detaily</label>
                            <textarea
                                value={editedData?.details} onChange={(e) => setEditedData({ ...editedData!, details: e.target.value })}
                                className="w-full p-3 border border-[#E5E9F2] rounded-xl text-sm min-h-[100px] text-[#0A2540]" />
                        </div>
                        <div className="mt-4 space-x-4">
                            <button
                                onClick={handleSave}
                                className="bg-[#0095FF] hover:bg-[#0077CC] text-white font-medium py-2 px-4 rounded-xl text-sm">
                                Uložit
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-xl text-sm">
                                Zrušit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDetails;
