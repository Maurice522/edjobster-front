import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // const logo = <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />

  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>

      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="4501.000000pt" height="4500.000000pt" viewBox="0 0 4501.000000 4500.000000"
        preserveAspectRatio="xMidYMid meet">

        <g transform="translate(0.000000,4500.000000) scale(0.100000,-0.100000)"
          fill="#000000" stroke="none">
          <path d="M25977 33696 c-63 -23 -114 -63 -144 -113 l-28 -48 -6 -7360 c-3
              -4048 -8 -7373 -12 -7390 -3 -16 -11 -75 -17 -130 -137 -1252 -862 -2435
              -1925 -3139 -193 -128 -275 -176 -461 -269 -860 -431 -1834 -538 -2790 -307
              -807 195 -1555 638 -2112 1252 -136 150 -223 218 -329 258 -191 72 -366 63
              -548 -27 -65 -32 -129 -93 -936 -901 -660 -660 -874 -880 -897 -922 -122 -219
              -113 -485 21 -687 55 -82 366 -405 567 -588 1229 -1119 2735 -1804 4365 -1984
              327 -36 496 -45 860 -45 482 0 820 26 1265 100 1386 228 2681 829 3755 1743
              901 766 1620 1737 2090 2821 333 770 525 1538 612 2445 16 168 17 680 21 7620
              2 5373 0 7454 -8 7491 -27 128 -161 212 -294 184 -44 -9 -76 -27 -166 -94
              -293 -218 -581 -344 -935 -407 -111 -20 -164 -23 -360 -23 -196 0 -249 3 -360
              23 -364 65 -662 197 -956 423 -107 83 -186 104 -272 74z"
              />
          <path d="M21155 22704 c-16 -2 -73 -9 -125 -15 -142 -16 -368 -64 -519 -109
              -1084 -328 -1890 -1202 -2132 -2310 -64 -293 -86 -695 -55 -990 75 -711 366
              -1344 845 -1843 709 -736 1716 -1072 2748 -916 903 137 1707 674 2178 1454
              648 1076 580 2493 -167 3495 -494 661 -1201 1081 -2043 1212 -103 16 -190 21
              -415 23 -157 2 -298 1 -315 -1z"/>
        </g>
      </svg>

      {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>

        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            fill="url(#BG1)"
            d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
          />
          <path
            fill="url(#BG2)"
            d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
          />
          <path
            fill="url(#BG3)"
            d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
          />
        </g>
      </svg> */}
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
