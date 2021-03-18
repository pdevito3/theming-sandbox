import { useQuery } from 'react-query';

async function fetchTheme(themeName) {
    if(themeName === "default"){
        return {
            "themeName" : "default",
            "bannerBg": "#105270",
            "bannerFi": "#fff",
            "bannerContent": "#00A694",
      };
    }

    return {
        "themeName" : "custom",
        "bannerBg": "red",
        "bannerFi": "yellow",
        "bannerContent": "pink",
    };
}

export default function useTheme(themeId) {
  return useQuery(['themes', themeId], () => fetchTheme(themeId))
}

