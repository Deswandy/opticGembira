<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MsKacamataStatusLog;

class MsKacamataStatusLogController extends Controller
{
    public function index()
    {
        $logs = MsKacamataStatusLog::with(['kacamata', 'status'])->get();
        return response()->json($logs);
    }

    public function store(Request $request)
    {
        $request->validate([
            'ms_kacamatas_id' => 'required|exists:ms_kacamatas,id',
            'ms_kacamata_statuses_id' => 'required|exists:ms_kacamata_statuses,id',
        ]);

        $log = MsKacamataStatusLog::create([
            'ms_kacamatas_id' => $request->ms_kacamatas_id,
            'ms_kacamata_statuses_id' => $request->ms_kacamata_statuses_id,
            'user_id' => auth()->id() ?? 1,
        ]);

        return response()->json($log);
    }

    public function destroy($id)
    {
        MsKacamataStatusLog::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
