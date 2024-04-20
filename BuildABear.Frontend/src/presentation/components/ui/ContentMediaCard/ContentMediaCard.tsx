import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

export const ContentMediaCard = ({ title, imageSrc, height }) => {
  return (
    <Card>
      {imageSrc && <CardMedia component="img" height={height} image={imageSrc} alt="Card Image" />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="center">
          {title}
        </Typography>
        {/* Other card content */}
      </CardContent>
    </Card>
  );
};
