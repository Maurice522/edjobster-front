import React, { useState, useMemo, useEffect } from 'react';
import { useGetInterviewLatestQuery } from '../../../redux/services/interview/InterviewServices';

function LatestInterview() {
    const { data = [], refetch } = useGetInterviewLatestQuery();
    console.log(data)
  return (
    <div>LatestInterview</div>
  )
}

export default LatestInterview