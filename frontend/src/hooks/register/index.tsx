import { ChangeEvent, useState } from 'react';
import { apiService } from '../../services/apiService';
import { useUser } from '../user/hook';
import { useNavigate } from 'react-router-dom';

function useRegister() {
  const [formData,setFormData] = useState({
    username:'',
    email:'',
    password:''
  });
  const [state,setState] = useState<'loading' | 'error' | 'idle'>('idle')
  const [error, setError] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({...prev, [name]:value}))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email, password } = formData

    setState('loading');
        if (!email || !password) {
            setState('error');
            setError('Please fill in all fields.');
            setState('idle');
            return;
        }

        try {
            const response = await apiService.register({ username, email, password });

            if (response) {
                console.log('Registration successful:', response);
                setUser(response.data);
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Network or Server Error:', err);
            setState('error');
            setError(err.message);
        } finally {
            setState('idle');
        }
  };

  return {
    formData,
    handleChange,
    error,
    state,
    handleSubmit,
  };
};

export default useRegister
