<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>RPLibrary</title>
</head>

<body style="background-color: #ece3ca; font-family: 'Montserrat', Arial, sans-serif; padding : 10svh">
    <h1 style="font-size: 3em ;background : #dbca9a; padding: 0.2em 0.5em; margin: 0; font-weight: bold">RPLibrary</h1>
    <div style="padding: 5px; background-color: #dbca9a;">
        <div style="text-align: center; background-color: #ece3ca; padding: 2em;">
            <h2>Hello, {{ $username }}.</h2>
            <div style="text-align: justify; font-size: 0.95em;">
                <p>Thank you for registering to RPLibrary.</p>
                <p>Here is your One-Time Password, do not share this with anyone else.</p>
            </div>
            <h1 style="color: #282425; font-size: 3em; margin-top: 1em;">{{ $otp }}</h1>
        </div>
        <div style="text-align: end">
            <h4 style="line-height: 0.5">
                RPLibrary inc.
            </h4>
            <p style="line-height: 0.5">
                Improving literacy rate since 2024
            </p>
            <p style="line-height: 0.5; font-size:0.6em">
                Copyright © 2024 - Society Group - Meikarta Apart Saffron Blok S.
            </p>
        </div>
    </div>
</body>

</html>
