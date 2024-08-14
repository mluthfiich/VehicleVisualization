import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function MediaCard({ children, maxWidthValue }) {
  return (
    <Card sx={{ maxWidth: maxWidthValue }}>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}