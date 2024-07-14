import { Box, Image } from '@chakra-ui/react';

const QrCode = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <Image src="./qr_code.svg" alt="QR Code" boxSize="50px" />
  </Box>
);

export default QrCode;
