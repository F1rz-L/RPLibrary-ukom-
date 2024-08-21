<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>RPLibrary</title>
    <style>
        h1{
        }
        
        body{
            text-align: center;
            background: beige;
            font-family: 'Figtree', sans-serif;
        }
    </style>
</head>
<body style="background-color: #ece3ca; text-align: center; font-family: 'Figtree', sans-serif;">
    <h1 style="font-size: 4em">RPLibrary</h1>
    <div>
        <h2>Hello, {{ $username }}.</h2>
        <p>Here is your One-Time Password, do not share this with anyone else.</p>
        {{-- <h1>{{ $otp }}</h1> --}}
        <h1 style="color: #282425; font-size: 5em">{{ $otp }}</h1>
    </div>
</body>
</html>
{{-- #dbca9a --}}