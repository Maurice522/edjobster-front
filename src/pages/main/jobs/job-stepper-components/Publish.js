import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Publish = () => {
  const job = useSelector((state) => state.job.job);
  useEffect(() => {
    console.log('job detailsssss:', job);
  }, [job]);
  return <div>Publish</div>;
};

export default Publish;
