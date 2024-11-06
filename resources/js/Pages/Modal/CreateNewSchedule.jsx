import { useState } from 'react';
import ReactModal from 'react-modal';

const CreateNewSchedule = ({ sendData, isOpen, closeModal }) => {
    const [scheduleData, SetShowScheduleData] = useState({});
    const handleCloseModal = () => {
        closeModal(false);
    };
    const handleSubmit = () => {
        if (scheduleData.date && scheduleData.price && scheduleData.quota)
            return sendData(scheduleData);
    };

    return (
        <ReactModal
            isOpen={isOpen}
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
            onRequestClose={handleCloseModal}
            className="relative flex w-[80%] flex-col rounded bg-white p-3 md:w-[30%]"
            overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[10] flex items-center justify-center"
        >
            <div className="mb-4 flex items-center justify-between">
                <p className="text-accent-content text-xl font-semibold">
                    Buat Jadwal Baru
                </p>
            </div>
            <div className="flex h-full flex-col">
                <div className="mb-2 flex flex-col">
                    <label className="" htmlFor="date">
                        Tanggal
                    </label>
                    <input
                        onChange={(e) =>
                            SetShowScheduleData({
                                ...scheduleData,
                                date: e.target.value,
                            })
                        }
                        className="rounded-md"
                        type="date"
                        name=""
                        id="date"
                        required
                    />
                </div>
                <div className="mb-2 flex flex-col">
                    <label className="" htmlFor="price">
                        Harga
                    </label>
                    <input
                        onChange={(e) =>
                            SetShowScheduleData({
                                ...scheduleData,
                                price: e.target.value,
                            })
                        }
                        className="rounded-md"
                        type="number"
                        name="price"
                        id="price"
                        required
                    />
                </div>
                <div className="mb-2 flex flex-col">
                    <label className="" htmlFor="quota">
                        Kuota
                    </label>
                    <input
                        onChange={(e) =>
                            SetShowScheduleData({
                                ...scheduleData,
                                quota: e.target.value,
                            })
                        }
                        className="rounded-md"
                        type="number"
                        name="quota"
                        id="quota"
                        required
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="rounded-md bg-blue-600 px-4 py-1 font-semibold text-white hover:bg-blue-700"
                >
                    Submit
                </button>
            </div>
        </ReactModal>
    );
};

export default CreateNewSchedule;
