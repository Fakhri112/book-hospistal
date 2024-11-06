import axios from 'axios';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import ReactModal from 'react-modal';
import CreateNewSchedule from './CreateNewSchedule';

const CreateNewClinic = ({ isOpen, closeModal }) => {
    const [showSchedules, SetShowSchedules] = useState(false);
    const [showSchedulesModal, SetShowSchedulesModal] = useState(false);
    const [schedules, SetSchedules] = useState([]);
    const formRef = useRef();

    const handleCloseModal = () => {
        SetSchedules([]);
        closeModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(formRef.current);
        data.append('schedules', JSON.stringify(schedules));
        axios.post('http://127.0.0.1:8000/clinic', data).then((data) => {
            handleCloseModal();
            toast.success('Berhasi Membuat Klinik Baru');
        });
    };

    function removeElementAtIndex(index) {
        if (index >= 0 && index < schedules.length) {
            let schedulesCopy = [
                ...schedules.slice(0, index),
                ...schedules.slice(index + 1),
            ];
            SetSchedules(schedulesCopy);
        }
    }

    return (
        <>
            <ReactModal
                isOpen={isOpen}
                shouldCloseOnOverlayClick={true}
                ariaHideApp={false}
                onRequestClose={handleCloseModal}
                className="relative flex h-[80%] w-[80%] flex-col rounded bg-white p-3 md:w-[50%]"
                overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[10] flex items-center justify-center"
            >
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-accent-content text-xl font-semibold">
                        Buat Klinik Baru
                    </p>
                    <div className="flex gap-x-2">
                        <button
                            onClick={() => SetShowSchedules(false)}
                            className={`rounded-md border border-slate-400 px-2 ${!showSchedules && 'bg-slate-500 font-semibold text-white'}`}
                        >
                            Profil
                        </button>
                        <button
                            onClick={() => SetShowSchedules(true)}
                            className={`rounded-md border border-slate-400 px-2 ${showSchedules && 'bg-slate-500 font-semibold text-white'}`}
                        >
                            Jadwal
                        </button>
                    </div>
                </div>

                <div className={`${!showSchedules && 'hidden'}`}>
                    <div className="text-end">
                        <button
                            onClick={() => SetShowSchedulesModal(true)}
                            className="rounded-md bg-blue-600 px-4 py-1 font-semibold text-white hover:bg-blue-700"
                        >
                            + Tambah Jadwal
                        </button>
                    </div>
                    <table class="mt-4 w-full table-fixed border border-slate-400">
                        <thead className="bg-slate-200 font-normal">
                            <tr>
                                <th>Tanggal</th>
                                <th>Harga</th>
                                <th>Kuota</th>
                                <th>Operasi</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {schedules.map((x, index) => (
                                <tr className="h-7">
                                    <td>{x.date}</td>
                                    <td>{x.price}</td>
                                    <td>{x.quota}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                removeElementAtIndex(index)
                                            }
                                            className="rounded-md bg-red-600 px-3 text-sm font-semibold text-white"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className={`flex h-full flex-col ${showSchedules && 'hidden'}`}
                >
                    <div className="mb-2 flex flex-col">
                        <label className="" htmlFor="name">
                            Nama Klinik
                        </label>
                        <input
                            className="rounded-md"
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label className="" htmlFor="address">
                            Alamat
                        </label>
                        <input
                            className="rounded-md"
                            type="text"
                            name="address"
                            id="address"
                        />
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label className="" htmlFor="category">
                            Kategori
                        </label>
                        <select className="rounded-md" name="category" id="">
                            <option value="Rumah Sakit">Rumah Sakit</option>
                            <option value="Praktek Dokter">
                                Praktek Dokter
                            </option>
                            <option value="Klinik">Klinik</option>
                        </select>
                    </div>
                    <div className="mt-3 flex flex-col">
                        <label className="" htmlFor="image_file">
                            Unggah Gambar
                        </label>
                        <input type="file" name="image_file" className="" />
                    </div>
                    <div className="mt-14 text-center">
                        <button className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                            Submit
                        </button>
                    </div>
                </form>
            </ReactModal>
            <CreateNewSchedule
                sendData={(data) => {
                    SetSchedules([...schedules, data]);
                    SetShowSchedulesModal(false);
                }}
                closeModal={() => SetShowSchedulesModal(false)}
                isOpen={showSchedulesModal}
            />
        </>
    );
};

export default CreateNewClinic;
