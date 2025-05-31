import { FC } from 'react';
import CustomTable from './features/CustomTable';
import { useGetBooksByPageQuery } from './entities/book/queries.ts';

const App: FC = () => {
  const { data, isSuccess } = useGetBooksByPageQuery();

  return (
    <>
      <CustomTable
        rows={isSuccess ? data.pages.flatMap((page) => page.books) : []}
      />
    </>
  );
};

export default App;
