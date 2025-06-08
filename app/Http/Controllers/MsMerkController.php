<?php

namespace App\Http\Controllers;

use App\Models\MsMerk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MsMerkController extends Controller
{
    public function index()
    {
        $merks = MsMerk::select('id', 'merk', 'created_at', 'updated_at')->get();

        return Inertia::render('Merk/Index', [
            'merks' => $merks,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'merk' => 'required|string|max:255|unique:ms_merks,merk'
        ]);

        MsMerk::create($validated);

        return to_route('ms-merks.index');
    }

    public function edit($id)
    {
        $merk = MsMerk::findOrFail($id);
        return Inertia::render('Merk/Edit', [
            'merk' => $merk
        ]);
    }

    public function update(Request $request, $id)
    {
        $merk = MsMerk::findOrFail($id);

        $validated = $request->validate([
            'merk' => 'required|string|max:255|unique:ms_merks,merk,' . $merk->id,
        ]);

        $merk->update($validated);

        return to_route('ms-merks.index');
    }

    public function destroy($id)
    {
        $merk = MsMerk::findOrFail($id);
        $merk->delete();

        return to_route('ms-merks.index');
    }
}
