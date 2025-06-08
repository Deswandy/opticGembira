import React from "react";

const MerkTable = ({ data }) => {
    return (
        <div className="bg-white shadow-sm sm:rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left font-medium text-gray-500">ID</th>
                        <th className="px-6 py-3 text-left font-medium text-gray-500">Merk</th>
                        <th className="px-6 py-3 text-left font-medium text-gray-500">Created At</th>
                        <th className="px-6 py-3 text-left font-medium text-gray-500">Updated At</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length > 0 ? (
                        data.map((merk) => (
                            <tr key={merk.id}>
                                <td className="px-6 py-4">{merk.id}</td>
                                <td className="px-6 py-4">{merk.merk}</td>
                                <td className="px-6 py-4">{new Date(merk.created_at).toLocaleString()}</td>
                                <td className="px-6 py-4">{new Date(merk.updated_at).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                Tidak ada data merk.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MerkTable;
