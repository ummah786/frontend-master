import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export const Logout = ({setFlag}) => {
    const navigate = useNavigate();

    useEffect(() => {
        setFlag(true);
        navigate('/');
    }, [ navigate]);

    return null;  // No need to render anything
};