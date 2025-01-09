import React, { useState } from 'react';


interface OtherFieldsProps {
    onSubmit: (data: {
        sender_name: string;
        sender_age: string;
        details: string;
        file_url: string;
    }) => void;
}

const OtherFields: React.FC<OtherFieldsProps> = ({ onSubmit }) => {
    const [selectedFile, setSelectedFile] = useState<string>('');
    const [formData, setFormData] = useState({
        sender_name: '',
        sender_age: '',
        details: '',
        file_url: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="space-y-6 mt-6">
            <div>
                <label className="text-[#4F6C8D] mb-2 flex items-center text-sm">
                    <span>Kdo se necítí dobře? (Vaše jméno)</span>
                    <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input type="text"
                    value={formData.sender_name} onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                    className="w-full p-3 border border-[#E5E9F2] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-[#0085ff]" required />
            </div>

            <div>
                <label className="text-[#4F6C8D] mb-2 flex items-center text-sm">
                    <span>Váš věk</span>
                    <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input type="number"
                    value={formData.sender_age} onChange={(e) => setFormData({ ...formData, sender_age: e.target.value })}
                    className="w-full p-3 border border-[#E5E9F2] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-[#0085ff]" required />
            </div>

            <div>
                <label className="text-[#4F6C8D] mb-2 flex items-center text-sm">
                    <span>Nahrát soubor</span>
                </label>
                <div className="space-y-2">
                    <label className="w-full p-3 rounded-xl text-white font-medium bg-[#0095FF] hover:bg-[#0077CC] transition-all duration-200 flex items-center justify-center cursor-pointer text-sm">
                        <input type="file" className="hidden"
                            onChange={(e) => { setSelectedFile(e.target.files?.[0]?.name || ''); setFormData({ ...formData, file_url: e.target.files?.[0]?.name || '' }); }} />
                        <span>Vybrat soubor</span>
                    </label>
                    {selectedFile && (
                        <div className="text-sm text-[#4F6C8D] pl-2">
                            Vybraný soubor: {selectedFile}
                        </div>
                    )}
                </div>
            </div>


            <div>
                <label className="text-[#4F6C8D] mb-2 flex items-center text-sm">
                    <span>Více informací</span>
                    <span className="text-gray-400 ml-2">(?)</span>
                </label>
                <textarea
                    value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full p-3 border border-[#E5E9F2] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[200px] text-[#0085ff]" placeholder="Uveďte prosím co nejvíce podrobností..." />
            </div>

            <button onClick={handleSubmit} className="w-full p-3 rounded-xl text-white font-medium bg-[#0095FF] hover:bg-[#0077CC] transition-all duration-200 text-sm" >
                Odeslat
            </button>
        </div>
    );
};

export default OtherFields;
