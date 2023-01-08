import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mock
// import account from '../../_mock/account';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import { newNavBar, mainSideBarData, settingsSideBarData } from './NavConfig';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
    top:`calc(10%)`,
    marginTop: 80,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>
      <input
        type="text"
        className="sidebar-search-input"
        placeholder="Search…"
      />
      
      {/* Edited by kundan agrawal for update nav bar section */}
      <Box sx={{ mb: 1.5, pb: 1.5, px: 1.5, mx: 1.5 }} style={{ borderBottom: `2px solid #0000001c` }}>
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
          New NavBar
        </Typography>
      </Box>
      <NavSection navConfig={newNavBar} />
      {/* Edited above by kundan agrawal for update nav bar section */}

      <Box sx={{ mb: 1.5, pb: 1.5, px: 1.5, mx: 1.5 }} style={{ borderBottom: `2px solid #0000001c` }}>
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
          Main
        </Typography>
      </Box>
      <NavSection navConfig={mainSideBarData} />

      <Box sx={{ mb: 1.5, mt: 3, pb: 1.5, px: 1.5, mx: 1.5 }} style={{ borderBottom: `2px solid #0000001c` }}>
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
          Settings
        </Typography>
      </Box>

      <NavSection navConfig={settingsSideBarData} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
