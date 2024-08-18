import React from 'react';
import { Button } from '@mui/material';

export default function ButtonComponent({
  children,
  mainColor,
  backColor,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  onClick
}) {
  return (
    <Button
      sx={{
        fontWeight: 'bold',
        backgroundColor: mainColor,
        color: 'white',
        '&:hover': { backgroundColor: backColor },
        marginLeft,
        marginRight,
        marginTop,
        marginBottom,
        borderRadius: 1.5
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}