import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReactModal from 'react-modal';

const BookingList = ({ isOpen, closeModal, clinicId }) => {
    const { auth } = usePage().props;
    const [scheduleLists, SetScheduleLists] = useState();
    const handleCloseModal = () => {
        SetScheduleLists();
        closeModal(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get(
                'http://localhost:8000/clinic/' + clinicId,
            );
            SetScheduleLists(response.data[0]);
        };
        if (isOpen) fetchData();
    }, [isOpen]);

    const handleBooking = (id) => {
        axios
            .post('http://localhost:8000/bookings/', {
                user_id: auth.user.id,
                schedule_id: id,
            })
            .then((data) => {
                toast.success('Berhasil Booking');
                closeModal(true);
            });
    };

    return (
        <ReactModal
            isOpen={isOpen}
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
            onRequestClose={handleCloseModal}
            className="relative flex h-[80%] w-[80%] flex-col rounded bg-white p-3 md:w-[80%]"
            overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[10] flex items-center justify-center"
        >
            <div className="mb-4 flex items-center justify-between">
                <p className="text-accent-content text-xl font-semibold">
                    Pilih Jadwal
                </p>
            </div>

            <div className={``}>
                <table className="mt-4 w-full table-fixed border border-slate-400">
                    <thead className="bg-slate-200 font-normal">
                        <tr>
                            <th>Tanggal</th>
                            <th>Harga</th>
                            <th>Kuota</th>
                            <th>Operasi</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {scheduleLists &&
                            scheduleLists.schedules.map((x, index) => (
                                <tr className="h-7" key={index}>
                                    <td>{x.date}</td>
                                    <td>{x.price}</td>
                                    <td>{x.quota}</td>
                                    <td>
                                        {x.quota > 0 ? (
                                            <button
                                                onClick={() =>
                                                    handleBooking(
                                                        scheduleLists.id,
                                                    )
                                                }
                                                className="rounded-md bg-green-600 px-3 text-sm font-semibold text-white hover:bg-green-700"
                                            >
                                                Booking
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    removeElementAtIndex(index)
                                                }
                                                className="pointer-events-none rounded-md bg-slate-400 px-3 text-sm font-semibold text-white"
                                            >
                                                Kuota Penuh
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </ReactModal>
    );
};

export default BookingList;
