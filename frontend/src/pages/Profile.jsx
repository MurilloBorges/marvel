import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const loading = (payload) => ({
  type: 'LOADER',
  payload,
});

export default function Profile({ history }) {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    toast.configure();
  }, []);

  return <div>Profile</div>;
}
