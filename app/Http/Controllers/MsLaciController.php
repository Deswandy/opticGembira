<?php

namespace App\Http\Controllers;

use App\Models\MsLaci;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MsLaciController extends Controller
{
    public function index()

    {
        $lacis = MsLaci::select('id', 'laci',  'created_at', 'updated_at')->get();

        return Inertia::render('Laci/Index', [
            'lacis' => $lacis, // ✅ DI SINI YANG PENTING
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'laci' => 'required|string|max:255|unique:ms_lacis,laci',
        ]);

        MsLaci::create($validated);

        return to_route('ms-lacis.index');
    }


    public function update(Request $request, $id)
    {
        $laci = MsLaci::findOrFail($id);

        $validated = $request->validate([
            'laci' => 'required|string|max:255|unique:ms_lacis,laci,' . $laci->id,
            'keterangan' => 'nullable|string|max:255'
        ]);

        $laci->update($validated);

        return to_route('ms-lacis.index');
    }

}
