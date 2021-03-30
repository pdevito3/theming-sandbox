import { useQuery } from 'react-query';

async function fetchTheme(themeName) {
    if(themeName === "default"){
      let theme = {
        "themeName" : "default",
        "navBg": "16, 82, 112",
        "navFi": "0,0,0",
        "navContent": "0, 166, 148",
      };  


      return theme;
    }

    return {
        "themeName" : "custom",
        "navBg": "255, 0, 0",
        "navFi": "255,255,0",
        "navContent": "255,182,193",
    };
}

export default function useTheme(themeId) {
  return useQuery(['themes', themeId], () => fetchTheme(themeId))
}

