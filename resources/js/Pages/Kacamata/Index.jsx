import { React, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import KacamataTable from "@/Components/KacamataTable"; // Pastikan path ini benar
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Form from "./Form"; // Pastikan path ini benar

// --- PERUBAHAN 1: Terima semua props dari controller ---
const Index = ({ auth, kacamata, masterLacis, masterMerks, masterStatuses }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kacamata
                </h2>
            }
        >
            <Head title="Kacamata" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div>
                        <div className="mb-4">
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-green-500 hover:bg-green-600">
                                        Tambah Kacamata
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Kacamata Baru</DialogTitle>
                                        <DialogDescription>
                                            Tambahkan data kacamata baru ke database
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div id="form">
                                        {/* --- PERUBAHAN 2: Teruskan data master ke Form, bukan 'kacamata' --- */}
                                        <Form
                                            lacis={masterLacis}
                                            merks={masterMerks}
                                            statuses={masterStatuses}
                                            onSuccess={() => setDialogOpen(false)}
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        {/* --- PERUBAHAN 3: Teruskan data master ke KacamataTable --- */}
                        <KacamataTable
                            data={kacamata}
                            masterLacis={masterLacis}
                            masterMerks={masterMerks}
                            masterStatuses={masterStatuses}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;