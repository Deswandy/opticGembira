<?php

namespace App\Http\Controllers;

use App\Models\MsKacamata;
use App\Models\MsLaci;
use App\Models\MsMerk;
use App\Models\MsKacamataStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class MsKacamataController extends Controller
{
    public function index()
    {
        $kacamatas = MsKacamata::with(['merkRelasi', 'laciRelasi', 'statusRelasi'])->get();
        return Inertia::render('Kacamata/Index', [
            'kacamata' => $kacamatas
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ms_merks_id' => 'required|exists:ms_merks,id',
            'ms_lacis_id' => 'required|exists:ms_lacis,id',
            'ms_kacamata_statuses_id' => 'required|exists:ms_kacamata_statuses,id',
            'tipe' => 'required|string|max:255',
            'bahan' => 'required|string|max:255',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // validate file
        ]);

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('kacamata', 'public'); // stored in storage/app/public/kacamata
            $validated['foto'] = $path;
        }

        do {
            $newid = strtoupper(Str::random(3));
        } while (MsKacamata::where('newid', $newid)->exists());

        $validated['newid'] = $newid;

        $kacamata = MsKacamata::create($validated);

        return to_route('ms-kacamatas.index');
    }


    public function show($id)
    {
        $kacamata = MsKacamata::with(['merk', 'laci', 'status'])->findOrFail($id);
        return response()->json($kacamata);
    }

    public function update(Request $request, $id)
    {
        $kacamata = MsKacamata::findOrFail($id);

        $request->validate([
            'ms_merks_id' => 'required|exists:ms_merks,id',
            'ms_lacis_id' => 'required|exists:ms_lacis,id',
            'ms_kacamata_statuses_id' => 'required|exists:ms_kacamata_statuses,id',
            'tipe' => 'required|string',
            'bahan' => 'required|string',
            'foto' => 'nullable|string',
        ]);

        $kacamata->update($request->all());

        return to_route('ms-kacamatas.index');
    }

    public function destroy($id)
    {
        $kacamata = MsKacamata::findOrFail($id);
        $kacamata->delete();

        return to_route('ms-kacamatas.index');
    }
}
