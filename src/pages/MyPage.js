import React, { useEffect } from 'react';
import axios from 'axios';

const MyPage = () => {
    let ACCESS_TOKEN = localStorage.getItem("accessToken");
    const getMyInfo = () => {
        axios.get('http://127.0.0.1:8080/api/users/details', {
            headers: {
                Authorization: `${ACCESS_TOKEN}`,
              },
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.error('Error get info', err);
        })
    }
    useEffect(() => {
        getMyInfo();
    }, []);
    return (
        <div>
            
        </div>
    );
};

export default MyPage;