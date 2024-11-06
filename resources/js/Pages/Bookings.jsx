import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Dashboard({ auth }) {
    const [clinicDatas, SetClinicDatas] = useState([]);

    const fetchData = async () => {
        let response = await axios.get(
            'http://127.0.0.1:8000/bookings/' + auth.user.id,
        );
        SetClinicDatas(response.data);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://127.0.0.1:8000/bookings/' + id).then((data) => {
            fetchData();
            toast.success('Berhasi Menghapus');
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Bookings" />
            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900">
                            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {clinicDatas.map((data) => (
                                    <li className="flex items-center justify-between bg-white p-3">
                                        <div className="flex items-center gap-x-3">
                                            <img
                                                width={100}
                                                src={data.clinic_image_file}
                                                alt=""
                                            />
                                            <div>
                                                <p className="text-2xl font-semibold">
                                                    {data.clinic_name}
                                                </p>
                                                <p className="text-sm">
                                                    {data.clinic_address}
                                                </p>
                                                <p>
                                                    Booking untuk tanggal{' '}
                                                    <b>{data.date}</b>
                                                </p>
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                data.bookmark_id,
                                                            )
                                                        }
                                                        className="rounded-md border bg-red-600 px-8 text-center font-semibold text-white hover:bg-red-700"
                                                    >
                                                        Hapus Bookings
                                                    </button>
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
