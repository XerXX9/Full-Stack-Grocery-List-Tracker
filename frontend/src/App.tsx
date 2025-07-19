import { Box, Container, Typography } from '@mui/material';

export default function Home() {
    return (
        <Box sx={{
            display: 'flex',
            pt: 8
        }}>
            <Container>
                <Typography variant='h2' align='center'>Welcome to your personal Grocery List</Typography>
            </Container>
        </Box>
            
        
        
    );
}
