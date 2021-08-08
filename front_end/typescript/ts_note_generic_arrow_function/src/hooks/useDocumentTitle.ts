import { useEffect } from 'react';

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    title && (document.title = title);
  }, [title]);
};

export default useDocumentTitle;
