import { useQuery } from 'react-query';

async function fetchTheme(themeId) {
    if(themeId === 1){
        return {
            "themeId" : 1,
            "primary" : "red"
      };
    }

    return {
        "themeId" : 2,
        "primary" : "blue"
    };
}

export default function useTheme(themeId) {
  return useQuery(['themes', themeId], () => fetchTheme(themeId))
}

