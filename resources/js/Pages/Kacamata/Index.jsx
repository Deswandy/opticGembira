import {React,useState} from "react";
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
import Form from "./Form";

const Index = ({ auth, error, kacamata, masterLacis, masterMerks, masterStatuses, }) => {
    console.log(kacamata);
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <AuthenticatedLayout
            auth={auth}
            error={error}
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
                        <div className=" mb-4">
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger>
                                    <Button className="bg-green-500 hover:bg-green-600 " onClick={() => setDialogOpen(true)}>
                                        Tambah Kacamata
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Kacamata Baru
                                        </DialogTitle>
                                        <DialogDescription>
                                            Tambahkan data kacamata baru ke database
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div id="form" className="">
                                        <Form 
                                            kacamata={kacamata} 
                                            onSuccess={() => setDialogOpen(false)}
                                        />
                                    </div>
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
