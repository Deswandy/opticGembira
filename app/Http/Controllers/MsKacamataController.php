<?php

namespace App\Http\Controllers;

use App\Models\MsKacamata;
use App\Models\MsLaci;
use App\Models\MsMerk;
use App\Models\MsKacamataStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MsKacamataController extends Controller
{
    public function index()
    {
        $kacamatas = MsKacamata::with(['merkRelasi', 'laciRelasi', 'statusRelasi'])->get();
        return Inertia::render('Kacamata/Index',[
            'kacamata'=> $kacamatas
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'ms_merks_id' => 'required|exists:ms_merks,id',
            'ms_lacis_id' => 'required|exists:ms_lacis,id',
            'ms_kacamata_statuses_id' => 'required|exists:ms_kacamata_statuses,id',
            'tipe' => 'required|string',
            'bahan' => 'required|string',
            'foto' => 'nullable|string',
        ]);

        $kacamata = MsKacamata::create($request->all());

        return response()->json($kacamata, 201);
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

        return response()->json($kacamata);
    }

    public function destroy($id)
    {
        $kacamata = MsKacamata::findOrFail($id);
        $kacamata->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
