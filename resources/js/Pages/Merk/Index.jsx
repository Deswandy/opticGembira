import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import MerkTable from "@/Components/MerkTable";

const Index = ({ auth, merks }) => {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Data Merk
                </h2>
            }
        >
            <Head title="Merk" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <MerkTable data={merks} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
