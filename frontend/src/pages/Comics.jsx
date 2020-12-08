import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const loading = (payload) => ({
  type: 'LOADER', payload,
});

export default function Comics({ history }) {
  const dispatch = useDispatch();
  const [comics, setComics] = useState([])

  useEffect(() => {
    toast.configure();
  }, []);

  return (
    <div>Comics</div>
  );
}