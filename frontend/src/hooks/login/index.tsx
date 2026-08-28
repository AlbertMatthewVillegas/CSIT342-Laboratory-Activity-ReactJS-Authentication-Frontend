import { ChangeEvent, useState } from 'react';
import { apiService } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../user/hook';
export const useLogin = () => {
  const [formData,setFormData] = useState({
    email:'',
    password:''
  });
  const [state,setState] = useState<'loading' | 'error' | 'idle'>('idle')
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken } = useUser();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({...prev, [name]:value}))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    setState('loading');
    if (!email || !password) {
        setState('error');
        setError('Please fill in all fields.');
        setState('idle');
        return;
    }

    try {
        const response = await apiService.login({ email, password });

        if (response) {
            console.log('Login successful:', response);
            setToken(response.entity);
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

export default useLogin
