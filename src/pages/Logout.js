import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export const Logout = ({onBooleanChange, setFlag}) => {
    const navigate = useNavigate();

    useEffect(() => {
        setFlag(true);
      //  onBooleanChange();  // Change the flag state
        navigate('/');      // Navigate to the home page
    }, [onBooleanChange, navigate]);

    return null;  // No need to render anything
};