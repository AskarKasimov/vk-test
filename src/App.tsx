import { FC } from 'react';
import CustomTable from './features/CustomTable';
import { useGetAllBooksQuery } from './entities/book/queries.ts';

const App: FC = () => {
  const { data, isSuccess } = useGetAllBooksQuery();

  return (
    <>
      <CustomTable rows={isSuccess ? data : []} />
    </>
  );
};

export default App;
