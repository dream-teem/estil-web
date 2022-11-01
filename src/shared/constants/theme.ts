export const theme = {
  palette: {
    background: {
      paper: 'rgb(255, 255, 255)',
      primary: 'rgb(255, 255, 255)',
      secondary: 'rgb(255, 35, 0)',
      disabled: 'rgba(60, 72, 88, 0.38)',
      danger: 'rgb(220,53,69)'
    },
    text: {
      primary: 'rgb(38, 38, 38)',
      secondary: 'rgb(255, 35, 0)',
      disabled: 'rgba(60, 72, 88, 0.38)',
      danger: 'rgb(220,53,69)'
    },
    button: {
      primary: 'rgb(0, 0, 0)',
      secondary: 'rgb(41, 96, 175)',
      disabled: 'rgba(60, 72, 88, 0.38)',
      danger: 'rgb(220,53,69)'
    }
  },
  typography: {
    fontSizes: ['2.369rem', '1.777rem', '1.333rem', '1rem', '0.75rem', '10px'],
    fontWeights: {
      body: 400,
      subheading: 500,
      link: 600,
      bold: 700,
      heading: 800
    },
    lineHeights: {
      body: 1.5,
      heading: 1.3,
      code: 1.6
    }
  }
}

export type AppDefaultTheme = typeof theme
