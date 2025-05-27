// It is used to define the type of the navigation routes in the app
export type RootStackParamList = {
  Tabs: undefined;
  QRScannerScreen: undefined;
  Home: undefined;
  Details: { itemId: number };
  QRScanner: undefined;
  SignUp: undefined;
  Login: undefined;
  MainApp: undefined;
  Profile: undefined;
  PlayerProfile: undefined;
  Booking: { 
    gameId?: number; 
    gameName?: string 
  } | undefined;
  playerId: {
    playerId: string | undefined;
    playerName: string | undefined;
    playerScore: string | undefined;
  };
  player: undefined;
  
  GameStats: undefined;
  Matches: undefined;
  Achievements: undefined;
  Connection: undefined;
  Market: undefined;
  Clans: undefined;
  ShareApp: undefined;
  RateUs: undefined;
  Support: undefined;
  ChangeLanguage: undefined;
  Help: undefined;
};