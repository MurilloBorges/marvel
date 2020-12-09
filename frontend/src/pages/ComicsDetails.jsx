import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const loading = (payload) => ({
  type: 'LOADER',
  payload,
});

export default function ComicsDetails({ history }) {
  const dispatch = useDispatch();
  const [characters, setCharacter] = useState([]);

  useEffect(() => {
    toast.configure();
  }, []);

  return <div>Details</div>;
}
