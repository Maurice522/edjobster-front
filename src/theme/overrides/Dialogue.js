export default function Dialogue(theme) {
  console.log(theme);
  return {
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  };
}
