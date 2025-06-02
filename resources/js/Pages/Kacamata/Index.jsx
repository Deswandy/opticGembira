import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Index = ({auth,error, kacamata}) => {
  console.log(kacamata);
    return (
        <AuthenticatedLayout
            auth={auth}
            error={error}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Kacamata" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div>
                        {kacamata.map((item, index)=>(
                            <div key={item.id}>
                                {item.tipe} - {item.bahan}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

  )
}

export default Index