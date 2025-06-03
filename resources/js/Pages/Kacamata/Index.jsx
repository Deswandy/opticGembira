import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import KacamataTable from "@/Components/KacamataTable";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const Index = ({ auth, error, kacamata }) => {
    console.log(kacamata);

    return (
        <AuthenticatedLayout
            auth={auth}
            error={error}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Kacamata" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div>
                        <div className=" mb-4">
                            <Dialog>
                                <DialogTrigger>
                                    <Button className="bg-green-500 hover:bg-green-600">
                                        Tambah Kacamata
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Are you absolutely sure?
                                        </DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This
                                            will permanently delete your account
                                            and remove your data from our
                                            servers.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="">Content here</div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <KacamataTable data={kacamata} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
