import { useContext, useState, useEffect } from 'react';
import { getStringFromPlaceholderText } from '../../../components/utils';
import { MunicipalityContext } from '../../../context/Municipality';

export const useSEO = page => {
  const { isMunicipality, municipality } = useContext(MunicipalityContext);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    if (!isMunicipality) {
      setTitle(page.title);
      setDescription(page.description?.internal?.content);
    } else {
      console.log(page.title, municipality);

      setTitle(getStringFromPlaceholderText(page.title, municipality));
      setDescription(
        getStringFromPlaceholderText(
          page.description?.internal?.content,
          municipality
        )
      );
    }
  }, [page, isMunicipality, municipality]);

  return { title, description };
};
