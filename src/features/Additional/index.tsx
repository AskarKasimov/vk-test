import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Additional = () => {
  useEffect(() => {
    toast.success('Hello world');
  }, []);
  return (
    <div>
      <h1>Additional</h1>
    </div>
  );
};

export default Additional;
