<?php

namespace App\Http\Controllers;

use App\Models\MsMerk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MsMerkController extends Controller
{
    // Method index sudah ada
    public function index()
    {
        return Inertia::render('Merk/Index', [
            'merks' => MsMerk::latest()->get(),
        ]);
    }

    // Method untuk menyimpan data baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'merk' => 'required|string|max:255|unique:ms_merks,merk',
        ]);

        MsMerk::create($validated);

        return to_route('ms-merks.index')->with('message', 'Merk berhasil ditambahkan.');
    }

    // Method untuk update data
    public function update(Request $request, MsMerk $ms_merk)
    {
        $validated = $request->validate([
            'merk' => 'required|string|max:255|unique:ms_merks,merk,' . $ms_merk->id,
        ]);

        $ms_merk->update($validated);

        return to_route('ms-merks.index')->with('message', 'Merk berhasil diperbarui.');
    }

    // Method untuk menghapus data
    public function destroy(MsMerk $ms_merk)
    {
        $ms_merk->delete();

        return to_route('ms-merks.index')->with('message', 'Merk berhasil dihapus.');
    }
}