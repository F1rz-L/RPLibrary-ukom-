<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Password Reset - RPLibrary</title>
</head>

<body style="background-color: #ece3ca; font-family: 'Montserrat', Arial, sans-serif; padding: 10svh;">
    <h1 style="font-size: 3em; background: #dbca9a; padding: 0.2em 0.5em; margin: 0; font-weight: bold;">RPLibrary</h1>
    <div style="padding: 5px; background-color: #dbca9a;">
        <div style="text-align: center; background-color: #ece3ca; padding: 2em;">
            {{-- <h2>Hello, {{ $username }}.</h2> --}}
            <div style="text-align: justify; font-size: 0.95em;">
                <p>You have requested to reset your password for RPLibrary.</p>
                <p>Click the button below to reset your password. If you didn't request this, please ignore this email.</p>
            </div>
            <a href="{{ $resetLink }}" style="display: inline-block; margin-top: 1.5em; padding: 0.8em 2em; background-color: #dbca9a; color: #282425; text-decoration: none; font-size: 1.2em; font-weight: bold; border-radius: 5px;">Reset Password</a>
        </div>
        <div style="text-align: end;">
            <h4 style="line-height: 0.5;">RPLibrary Inc.</h4>
            <p style="line-height: 0.5;">Improving literacy rate since 2024</p>
            <p style="line-height: 0.5; font-size: 0.6em;">Copyright © 2024 - Society Group - Meikarta Apart Saffron Blok S.</p>
        </div>
    </div>
</body>

</html>
