// resources/js/Pages/Laci/Index.jsx
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import LaciTable from "@/Components/LaciTable";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Form from "./Form";

// Ubah sini: dari "laci" ke "lacis"
const Index = ({ auth, error, lacis }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <AuthenticatedLayout
            auth={auth}
            error={error}
            header={
                <div className="flex flex-row items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Data Laci
                    </h2>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    className="bg-green-500 hover:bg-green-600 mb-2"
                                    onClick={() => setDialogOpen(true)}
                                >
                                    Tambah Laci
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Tambah Laci Baru</DialogTitle>
                                    <DialogDescription>
                                        Tambahkan data laci baru ke dalam sistem.
                                    </DialogDescription>
                                </DialogHeader>
                                <Form
                                    onSuccess={() => setDialogOpen(false)}
                                />
                            </DialogContent>
                        </Dialog>
                </div>
            }
        >
            <Head title="Laci" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 ">
                        {/* Tambah Laci Dialog */}
                        

                        {/* Tabel Laci */}
                        <LaciTable data={lacis} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
