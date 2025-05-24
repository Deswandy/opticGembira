<!DOCTYPE html>
<html>
<head>
    <title>Label Kacamata {{ $kacamata->id }}</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .label { 
            width: 80mm; 
            height: 50mm; 
            border: 1px solid #000; 
            padding: 5mm;
            margin: 0 auto;
        }
        .barcode { font-family: 'Libre Barcode 128', cursive; font-size: 24px; }
        .center { text-align: center; }
    </style>
</head>
<body>
    <div class="label">
        <div class="center">
            <h3>{{ $kacamata->merkData->merk }}</h3>
            <p>{{ $kacamata->tipe }} - {{ $kacamata->bahan }}</p>
            <p class="barcode">*{{ $kacamata->id }}*</p>
            <p>Laci: {{ $kacamata->laci }}</p>
        </div>
    </div>
</body>
</html>