import { useQuery } from 'react-query';

async function fetchTheme(themeName) {
    if(themeName === "default"){
        return {
            "themeName" : "default",
            "navBg": "#105270",
            "navFi": "#fff",
            "navContent": "#00A694",
      };
    }

    return {
        "themeName" : "custom",
        "navBg": "red",
        "navFi": "yellow",
        "navContent": "pink",
    };
}

export default function useTheme(themeId) {
  return useQuery(['themes', themeId], () => fetchTheme(themeId))
}

