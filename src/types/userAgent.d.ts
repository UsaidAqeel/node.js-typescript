export interface UserAgentInfo {
  browser: string;
  version: string;
  os: string;
  platform: string;
  source: string;
  device: {
    isDesktop: boolean;
    isMobile: boolean;
    isTablet: boolean;
  };
}