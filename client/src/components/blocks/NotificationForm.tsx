
import React, { useState } from 'react';
// import axios from 'axios';
import OtherFields from './OtherFields';
import { Link } from 'react-router-dom';


const NotificationForm = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [showOtherFields, setShowOtherFields] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        category: '',
        sender_name: '',
        sender_age: '',
        details: '',
        file_url: ''
    });

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setFormData(prev => ({ ...prev, category: e.target.value }));
    };

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();
        setShowOtherFields(true);
    };

    const handleSubmit = async (otherFieldsData: {
        sender_name: string,
        sender_age: string,
        details: string,
        file_url: string
    }) => {
        const finalData = {
            ...formData,
            ...otherFieldsData
        };

        console.log('Sending data:', finalData);

        try {
            const response = await fetch('http://localhost:3001/api/notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalData)
            });
            const data = await response.json();
            console.log('Success:', data);

            // Очистка формы
            setFormData({
                category: '',
                sender_name: '',
                sender_age: '',
                details: '',
                file_url: ''
            });
            setSelectedCategory('');
            setShowOtherFields(false);

            // Перенаправление на список уведомлений
            window.location.href = '/lists';
            // или для обновления текущей страницы
            // window.location.reload();

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col items-center py-12 px-4 w-[814px] h-[844px]">{/* bg-green-100 */}
            <div className="w-full max-w-2xl">
                <Link to="/lists" className="text-[#0095FF] hover:text-[#0077CC] mb-4 inline-block text-sm">← Zpět na seznam</Link>
                <h1 className="text-3xl font-bold text-[#0A2540] text-center mb-8">Nové oznámení</h1>
                <form className="space-y-6">
                    <div>
                        <label className="text-[#4F6C8D] mb-2 flex items-center text-sm">
                            <span className="text-[#4F6C8D]">Kategorie</span>
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>

                        <select className="w-full p-3 border border-[#E5E9F2] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-[#0085ff]" required value={selectedCategory}
                            onChange={handleCategoryChange}>
                            <option value="" disabled>Vyberte jednu možnost</option>
                            <option value="sikana">Šikana, špatné chování</option>
                            <option value="uceni">Potíže s učením</option>
                            <option value="problemy">Problémy doma</option>
                            <option value="jine">Něco jiného</option>
                        </select>
                    </div>
                    {!showOtherFields && (
                        <button
                            onClick={handleContinue}
                            disabled={!selectedCategory}
                            className={`w-full p-3 rounded-xl text-white font-medium transition-all duration-200 text-sm ${selectedCategory
                                ? 'bg-[#0095FF] hover:bg-[#0077CC] cursor-pointer'
                                : 'bg-[#E5E9F2] cursor-not-allowed'
                                }`}
                        >
                            Pokračovat
                        </button>
                    )}
                    {/* {showOtherFields && <OtherFields onSubmit={() => console.log('Form submitted')} />} */}
                    {showOtherFields && <OtherFields onSubmit={handleSubmit} />}

                </form>

            </div>
        </div>
    );
};

export default NotificationForm;


