import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function CheckBluemark() {
    const statusUser = sessionStorage.getItem('status_user');
    const navigate = useNavigate();
    const route = useLocation(); // Correctly destructure route
    // console.log(route);

    const newPath = location.pathname.replace('/check', '');
    console.log(newPath);
    
    useEffect(() => {
        if (statusUser !== "1") { // Ensure correct comparison
            navigate(newPath);
        } else {
            navigate('/getbluemark');
        }
    }, [statusUser, route, navigate]); // Add route to dependency array

    return null;
}

export default CheckBluemark;
