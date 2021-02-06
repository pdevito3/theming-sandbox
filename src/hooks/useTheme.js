import { useQuery } from 'react-query';

async function fetchTheme(themeName) {
    if(themeName === "default"){
        return {
            "themeName" : "default",
            "primary" : "red"
      };
    }

    return {
        "themeName" : "custom",
        "primary" : "blue"
    };
}

export default function useTheme(themeId) {
  return useQuery(['themes', themeId], () => fetchTheme(themeId))
}

