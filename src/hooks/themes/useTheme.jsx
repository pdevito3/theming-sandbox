import { useQuery } from 'react-query';
import { themeKeys } from './themeKeys'

async function fetchTheme(themeName) {
  // this is really a fetch or axios call
    if(themeName === "default"){
      let theme = {
        "themeName" : "default",
        "bannerPrimary": "255, 255, 255",
        "bannerFi": "27, 49, 65",
        "bannerSecondary": "0, 250, 221",
        "contentPrimaryBg": "255, 255, 255",
        "contentPrimaryFi": "27, 49 ,65",
        "contentSecondaryBg": "242, 244, 245",
        "contentSecondaryFi": "27, 49, 65",
        "accentBg": "19, 97, 134",
        "accentFi": "255, 255, 255",
        "selectedBg": "211, 237, 249",
        "hyperlink": "33, 164, 223",
      };  

      return theme;
    }

    return {
        "themeName" : "custom",
        "bannerPrimary": "255, 90, 255",
        "bannerFi": "27, 200, 65",
        "bannerSecondary": "30, 45, 221",
        "contentPrimaryBg": "255, 255, 255",
        "contentPrimaryFi": "27, 49 ,54",
        "contentSecondaryBg": "242, 255, 245",
        "contentSecondaryFi": "27, 251, 22",
        "accentBg": "19, 97, 234",
        "accentFi": "1, 255, 33",
        "hyperlink": "43, 31, 155",
        "selectedBg": "33, 164, 223",
    };
}

export default function useTheme(themeId) {
  return useQuery(themeKeys.theme(themeId), () => fetchTheme(themeId))
}

