import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, baseURLState } from '../../../recoil/atoms';

import 'ldrs/squircle';

const LoginSuccess = () => {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);
  const baseURL = useRecoilValue(baseURLState);

  useEffect(() => {
    axios
      .post(`${baseURL}/auth/refresh`, {}, { withCredentials: true })
      .then((response) => {
        const accessToken = response.headers['authorization'].split(' ')[1];
        localStorage.setItem('accessToken', accessToken);
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to refresh access token');
      })
      .then((response) => {
        axios({
          method: 'get',
          url: `${baseURL}/api/users/info`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }).then((res) => {
          setUserState(res.data);
          navigate('/');
        });
      });
  }, []);

  return (
    <div className="flex h-full items-center justify-center">
      <l-tailspin size="50" stroke="6" speed="0.8" color="black"></l-tailspin>
    </div>
  );
};

export default LoginSuccess;
