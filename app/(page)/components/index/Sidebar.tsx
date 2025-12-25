'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Sidebar() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Profile Card */}
      <Card sx={{ textAlign: 'center', overflow: 'visible', }}>
        <Box sx={{ position: 'relative', height: 100 }}>
          {/* Background area if needed */}
        </Box>
        <CardContent sx={{ pt: 0, position: 'relative' }}>
          <Avatar
            src="https://mui.com/static/images/avatar/1.jpg"
            sx={{
              width: 100,
              height: 100,
              margin: '0 auto',
              border: '4px solid #fff',
              transform: 'translateY(-50%)',
              mb: -5
            }}
          />
          <Typography variant="h5" component="div" gutterBottom>
            Jerry
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            A Simple and Card UI Design theme for Hexo
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-around"
            sx={{ my: 2 }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Box>
              <Typography variant="subtitle2" display="block">Articles</Typography>
              <Typography variant="h6">25</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" display="block">Tags</Typography>
              <Typography variant="h6">12</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" display="block">Categories</Typography>
              <Typography variant="h6">6</Typography>
            </Box>
          </Stack>

          <Stack direction="row" justifyContent="center" spacing={2}>
            <GitHubIcon sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }} />
            <EmailIcon sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }} />
            <TwitterIcon sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }} />
          </Stack>
        </CardContent>
      </Card>

      {/* Announcement */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <span role="img" aria-label="announcement">🔔</span> Announcement
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is a replica of the Butterfly theme using Material UI and Next.js.
          </Typography>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Posts
          </Typography>
          <Stack spacing={2}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1 }}>
                <Box
                  component="img"
                  src={`https://source.unsplash.com/random/100x100?sig=${i}`}
                  sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                  alt="thumb"
                />
                <Box>
                  <Typography variant="subtitle2" sx={{ lineHeight: 1.2, mb: 0.5 }}>
                    Butterfly 5.{i} Released
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    2025-09-09
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Tags
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {['Hexo', 'Butterfly', 'React', 'MUI', 'Next.js', 'Tutorial'].map((tag) => (
              <Chip key={tag} label={tag} clickable size="small" />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

