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
        $kacamata = MsKacamata::findOrFail($id);

        $validated = $request->validate([
            'ms_merks_id' => 'required|exists:ms_merks,id',
            'ms_lacis_id' => 'required|exists:ms_lacis,id',
            'ms_kacamata_statuses_id' => 'required|exists:ms_kacamata_statuses,id',
            'tipe' => 'required|string|max:255',
            'bahan' => 'required|string|max:255',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            if ($kacamata->foto) {
                Storage::disk('public')->delete($kacamata->foto);
            }
            $path = $request->file('foto')->store('kacamata', 'public');
            $validated['foto'] = $path;
        }

        $kacamata->update($validated);

        return to_route('ms-kacamatas.index');
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
      public function showLogs(MsKacamata $ms_kacamata)
    {
        $logs = Activity::forSubject($ms_kacamata)
                        ->with('causer') // 'causer' adalah relasi ke model User
                        ->latest()
                        ->get();

        return response()->json($logs);
    }
}