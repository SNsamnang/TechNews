<!DOCTYPE html>
<html lang="km">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Cambo Report | ព័ត៌មានកម្ពុជា</title>

    <!-- Khmer + Latin fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Hanuman:wght@400;700&family=Noto+Sans+Khmer:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
</head>

<body>
    <div id="app"></div>
</body>

</html>