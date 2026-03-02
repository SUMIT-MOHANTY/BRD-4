import React from 'react';

export default function DateRangeSelector({onChange}) {
  const handleStart = e => onChange(e.target.value, null);
  const handleEnd = e => onChange(null, e.target.value);
  return (
    <div className='date-range-selector'>
      <label>Start: <input type='date' onChange={e=>onChange(e.target.value, null)} /></label>
      <label>End: <input type='date' onChange={e=>onChange(null, e.target.value)} /></label>
    </div>
  );
}
