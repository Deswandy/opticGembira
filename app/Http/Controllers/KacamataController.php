<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Models\Kacamata;
use App\Models\Merk;
use App\Models\KacamataStatus;
use App\Models\Laci;
use App\Models\User;
use App\Models\KacamataStatusLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class KacamataController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $kacamatas = Kacamata::with(['merkData', 'statusData', 'laciData'])
            ->when($search, function($query, $search) {
                return $query->where('id', 'like', "%$search%")
                    ->orWhere('tipe', 'like', "%$search%")
                    ->orWhere('bahan', 'like', "%$search%")
                    ->orWhereHas('merkData', function($q) use ($search) {
                        $q->where('merk', 'like', "%$search%");
                    });
            })
            ->paginate(10);
            
        return view('kacamata.index', compact('kacamatas'));
    }

    public function create()
    {
        $merks = Merk::all();
        $lacis = Laci::all();
        $statuses = KacamataStatus::all();
        return view('kacamata.create', compact('merks', 'lacis', 'statuses'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'laci' => 'required|exists:ms_laci,laci',
            'merk' => 'required|exists:ms_merk,id',
            'tipe' => 'required|string|max:100',
            'bahan' => 'required|string|max:50',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'status' => 'required|exists:ms_kacamata_status,status'
        ]);

        // Generate ID: Laci + Nomor Urut
        $lastItem = Kacamata::where('laci', $request->laci)->orderBy('id', 'desc')->first();
        $nextNumber = $lastItem ? (int) substr($lastItem->id, -3) + 1 : 1;
        $validated['id'] = $request->laci . '-' . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('public/kacamata');
            $validated['foto'] = str_replace('public/', '', $path);
        }

        $kacamata = Kacamata::create($validated);

        // Log status awal
        KacamataStatusLog::create([
            'id' => Str::uuid(),
            'kacamata_id' => $kacamata->id,
            'status_id' => $kacamata->status,
            'user_id' => auth()->id() ?? User::first()->id,
            'notes' => 'Data kacamata pertama kali dibuat',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        return redirect()->route('kacamata.index')
            ->with('success', 'Kacamata berhasil ditambahkan. ID: ' . $kacamata->id);
    }

    public function edit($id)
    {
        $kacamata = Kacamata::findOrFail($id);
        $merks = Merk::all();
        $lacis = Laci::all();
        $statuses = KacamataStatus::all();
        
        return view('kacamata.edit', compact('kacamata', 'merks', 'lacis', 'statuses'));
    }

    public function update(Request $request, $id)
    {
        $kacamata = Kacamata::findOrFail($id);
        
        $validated = $request->validate([
            'merk' => 'required|exists:ms_merk,id',
            'tipe' => 'required|string|max:100',
            'bahan' => 'required|string|max:50',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'status' => 'required|exists:ms_kacamata_status,status',
            'hapus_foto' => 'nullable'
        ]);

        // Handle foto
        if ($request->boolean('hapus_foto') && $kacamata->foto) {
            Storage::delete('public/' . $kacamata->foto);
            $validated['foto'] = null;
        } elseif ($request->hasFile('foto')) {
            // Hapus foto lama jika ada
            if ($kacamata->foto) {
                Storage::delete('public/' . $kacamata->foto);
            }
            
            $path = $request->file('foto')->store('public/kacamata');
            $validated['foto'] = str_replace('public/', '', $path);
        } else {
            // Pertahankan foto yang ada
            unset($validated['foto']);
        }

        $kacamata->update($validated);

        return redirect()->route('kacamata.index')
            ->with('success', 'Data kacamata berhasil diperbarui');
    }

    public function destroy(Kacamata $kacamata)
    {
        if ($kacamata->foto) {
            Storage::delete('public/' . $kacamata->foto);
        }

        // Hapus log status terlebih dahulu
        $kacamata->statusLogs()->delete();
        
        $kacamata->delete();

        return redirect()->route('kacamata.index')
            ->with('success', 'Kacamata berhasil dihapus');
    }

    public function editStatus($id)
    {
        $kacamata = Kacamata::findOrFail($id);
        $statuses = KacamataStatus::all();
        $logs = KacamataStatusLog::with(['statusData', 'user'])
            ->where('kacamata_id', $id)
            ->latest()
            ->get();
            
        return view('kacamata.edit-status', compact('kacamata', 'statuses', 'logs'));
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|exists:ms_kacamata_status,status',
            'notes' => 'nullable|string|max:255'
        ]);

        $kacamata = Kacamata::findOrFail($id);
        $oldStatus = $kacamata->status;
        
        // Update status kacamata
        $kacamata->update(['status' => $request->status]);

        // Buat log perubahan status
   KacamataStatusLog::create([
    'kacamata_id' => $kacamata->id,
    'status_id' => $request->status,
    'user_id' => auth()->id(),
    'notes' => $request->notes ?? "Status diubah dari $oldStatus menjadi {$request->status}"
]);

        return redirect()->route('kacamata.index')
            ->with('success', 'Status kacamata berhasil diperbarui');
    }

    public function printLabel(Kacamata $kacamata)
    {
        return view('kacamata.label', compact('kacamata'));
    }
}