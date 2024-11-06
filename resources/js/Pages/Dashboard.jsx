import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import BookingList from './Modal/BookingList';
import CreateNewClinic from './Modal/CreateNewClinic';

export default function Dashboard({ auth }) {
    const [createModal, SetCreateModal] = useState(false);
    const [bookmarkModal, SetBookmarkModal] = useState(false);
    const [selectedData, SetSelectedData] = useState(0);
    const [clinicDatas, SetClinicDatas] = useState([]);

    const fetchData = async () => {
        let response = await axios.get('http://127.0.0.1:8000/clinic');
        SetClinicDatas(response.data);
    };
    useEffect(() => {
        if (createModal == false) fetchData();
    }, [createModal]);

    const handleDelete = (id) => {
        axios.delete('http://127.0.0.1:8000/clinic/' + id).then((data) => {
            fetchData();
            toast.success('Berhasil Menghapus Klinik');
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <CreateNewClinic
                isOpen={createModal}
                closeModal={() => SetCreateModal(false)}
            />
            <BookingList
                clinicId={selectedData}
                isOpen={bookmarkModal}
                closeModal={() => SetBookmarkModal(false)}
            />
            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900">
                            {auth.user.role == 'admin' && (
                                <button
                                    onClick={() => SetCreateModal(true)}
                                    className="my-5 rounded-md bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700"
                                >
                                    + Buat Klinik Baru
                                </button>
                            )}
                            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {clinicDatas.map((data) => (
                                    <li className="flex items-center justify-between bg-white p-3">
                                        <div className="flex items-center gap-x-3">
                                            <img
                                                width={100}
                                                src={data.image_file}
                                                alt=""
                                            />
                                            <div>
                                                <p className="text-2xl font-semibold">
                                                    {data.name}
                                                </p>
                                                <p className="text-sm">
                                                    {data.category}
                                                </p>
                                                <p>{data.address}</p>
                                                <div>
                                                    {auth.user.role ==
                                                    'admin' ? (
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    data.id,
                                                                )
                                                            }
                                                            className="rounded-md border bg-red-600 px-8 text-center font-semibold text-white hover:bg-red-700"
                                                        >
                                                            Hapus
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => {
                                                                SetSelectedData(
                                                                    data.id,
                                                                );
                                                                SetBookmarkModal(
                                                                    true,
                                                                );
                                                            }}
                                                            className="rounded-md border bg-blue-600 px-8 text-center font-semibold text-white hover:bg-blue-700"
                                                        >
                                                            Booking Jadwal
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
