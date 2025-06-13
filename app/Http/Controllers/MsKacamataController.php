<?php

namespace App\Http\Controllers;

use App\Models\MsKacamata;
use App\Models\MsLaci;           // <-- TAMBAHKAN: Import model Laci
use App\Models\MsMerk;          // <-- TAMBAHKAN: Import model Merk
use App\Models\MsKacamataStatus; // <-- TAMBAHKAN: Import model Status
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity; // <-- 1. TAMBAHKAN IMPORT INI


class MsKacamataController extends Controller
{
    /**
     * Menampilkan halaman utama dan mengirimkan semua data yang diperlukan.
     */
    public function index()
    {
        // Ambil semua data master untuk form dropdown.
        // Diurutkan berdasarkan abjad untuk pengalaman pengguna yang lebih baik.
        $masterLacis = MsLaci::orderBy('laci')->get();
        $masterMerks = MsMerk::orderBy('merk')->get();
        $masterStatuses = MsKacamataStatus::all();

        // Ambil data kacamata untuk ditampilkan di tabel utama.
        $kacamatas = MsKacamata::with(['merkRelasi', 'laciRelasi', 'statusRelasi'])->latest()->get();

        // Kirim semua data ke komponen Inertia/React.
        return Inertia::render('Kacamata/Index', [
            'kacamata' => $kacamatas,
            'masterLacis' => $masterLacis,         // Prop baru untuk daftar laci lengkap
            'masterMerks' => $masterMerks,         // Prop baru untuk daftar merk lengkap
            'masterStatuses' => $masterStatuses,   // Prop baru untuk daftar status lengkap
        ]);
    }
    /**
     * Menyimpan data kacamata baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ms_merks_id' => 'required|exists:ms_merks,id',
            'ms_lacis_id' => 'required|exists:ms_lacis,id',
            'ms_kacamata_statuses_id' => 'required|exists:ms_kacamata_statuses,id',
            'tipe' => 'required|string|max:255',
            'bahan' => 'required|string|max:255',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('kacamata', 'public');
            $validated['foto'] = $path;
        }

        do {
            $newid = strtoupper(Str::random(3));
        } while (MsKacamata::where('newid', $newid)->exists());

        $validated['newid'] = $newid;

        MsKacamata::create($validated);

        return to_route('ms-kacamatas.index');
    }

    /**
     * Memperbarui data kacamata yang ada.
     */
    public function update(Request $request, $id)
{
    $request->validate([
        'tipe' => 'required|string',
        'bahan' => 'required|string',
        'ms_lacis_id' => 'required|exists:ms_lacis,id',
        'ms_merks_id' => 'required|exists:ms_merks,id',
        'ms_kacamata_statuses_id' => 'required|exists:ms_kacamata_statuses,id',
        'foto' => 'nullable|image',
    ]);

    $kacamata = MsKacamata::findOrFail($id);

    $oldStatusId = $kacamata->ms_kacamata_statuses_id;

    $kacamata->update([
        'tipe' => $request->tipe,
        'bahan' => $request->bahan,
        'ms_lacis_id' => $request->ms_lacis_id,
        'ms_merks_id' => $request->ms_merks_id,
        'ms_kacamata_statuses_id' => $request->ms_kacamata_statuses_id,
        'foto' => $request->hasFile('foto') 
            ? $request->file('foto')->store('kacamata_photos', 'public')
            : $kacamata->foto,
    ]);

    // ✅ Log status change if it changed
    if ($oldStatusId != $request->ms_kacamata_statuses_id) {
        \App\Models\MsKacamataStatusLog::create([
            'ms_kacamatas_id' => $kacamata->id,
            'ms_kacamata_statuses_id' => $request->ms_kacamata_statuses_id,
            'user_id' => auth()->id() ?? 1,
        ]);
    }

    return redirect()->route('ms-kacamatas.index')->with('success', 'Data berhasil diperbarui.');
}


    /**
     * Menghapus data kacamata.
     */
    public function destroy($id)
    {
        $kacamata = MsKacamata::findOrFail($id);

        if ($kacamata->foto) {
            Storage::disk('public')->delete($kacamata->foto);
        }

        $kacamata->delete();

        return to_route('ms-kacamatas.index');
    }
public function showLogs($id)
{
    $kacamata = \App\Models\MsKacamata::findOrFail($id);

    $logs = \App\Models\MsKacamataStatusLog::where('ms_kacamatas_id', $kacamata->id)
                ->with(['status', 'user']) // These are now proper Eloquent relations
                ->latest()
                ->get()
                ->map(function ($log) {
                    return [
                        'created_at' => $log->created_at,
                        'status' => $log->status?->status ?? 'Tidak diketahui',
                        'user' => $log->user?->name ?? 'Tidak diketahui',
                    ];
                });

    return response()->json($logs);
}


    
    // app/Http/Controllers/MsKacamataController.php

public function updateStatus(Request $request, $id)
{
    $request->validate([
        'ms_kacamata_statuses_id' => 'required|exists:ms_kacamata_statuses,id',
    ]);

    $kacamata = MsKacamata::findOrFail($id);

    // Only log if status actually changed
    if ($kacamata->ms_kacamata_statuses_id != $request->ms_kacamata_statuses_id) {
        $kacamata->update([
            'ms_kacamata_statuses_id' => $request->ms_kacamata_statuses_id,
        ]);

        MsKacamataStatusLog::create([
            'ms_kacamatas_id' => $kacamata->id,
            'ms_kacamata_statuses_id' => $request->ms_kacamata_statuses_id,
            'user_id' => auth()->id() ?? 1,
        ]);
    }

    return back()->with('success', 'Status updated and logged');
}

}