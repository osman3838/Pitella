
export const Images = {
  Home: {
    Cover:require("./images/pitella-cover.png"),
    BottomBar:
    {
    Cover:require ("./images/bottombar/bottom.png"),
    },
    Hero: {
      Background: require('./images/home/hero/background.png'),
      Cup1: require('./images/home/hero/foreground-cup1.png'),
      Cup2: require('./images/home/hero/foreground-cup2.png'),
    },
    Campaign: {
      Campaign: require('./images/campaings/campaing-01.jpg'),
      
    },

  },
  Login:
  {
    Background01:require("./images/login/background-01.png"),
    Background02:require("./images/login/background-02.png"),
    Background03:require("./images/login/background-03.png"),

  },
  Register:{
    Background01:require("./images/register/background-01.png"),
    Background02:require("./images/register/background-02.png"),

  },
  SendCode: 
  {
    Background01:require("./images/sendcode/background-01.png"),
    Background02:require("./images/sendcode/background-02.png"),
  },
  FindMail:{

    Background01:require("./images/findmail/background-01.png"),
    Background02:require("./images/findmail/background-02.png"),

  },
    Logo:require("./images/common/logo.png"),

} as const;
