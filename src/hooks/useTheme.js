import { useQuery } from 'react-query';

async function fetchTheme(themeName) {
    if(themeName === "default"){
      let theme = {
        "themeName" : "default",
        "bannerPrimary": "16, 82, 112",
        "bannerFi": "0,0,0",
        "bannerSecondary": "0, 166, 148",
      };  


      return theme;
    }

    return {
        "themeName" : "custom",
        "bannerPrimary": "239, 68, 68",
        "bannerFi": "245, 158, 11",
        "bannerSecondary": "128,0,128",
    };
}

export default function useTheme(themeId) {
  return useQuery(['themes', themeId], () => fetchTheme(themeId))
}

