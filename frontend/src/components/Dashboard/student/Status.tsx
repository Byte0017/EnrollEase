// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '@/context/AuthContext';
// import { Typography, Container, Box, CircularProgress, Alert } from '@mui/material';

// const Status = () => {
//   const { user } = useContext(AuthContext);
//   const [status, setStatus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // Track errors

//   useEffect(() => {
//     // Check if user is authenticated and has an ID
//     if (user && user.id) {
//       const fetchStatus = async () => {
//         try {
//           const response = await axios.get(`/api/admission-status/${user.id}`);
//           setStatus(response.data.status); // Assuming response has `status`
//         } catch (error) {
//           setError('Error fetching admission status. Please try again later.'); // Handle error message
//           console.error('Error fetching admission status:', error);
//         } finally {
//           setLoading(false); // Set loading to false regardless of success or failure
//         }
//       };

//       fetchStatus();
//     } else {
//       setError('User is not authenticated.');
//       setLoading(false);
//     }
//   }, [user]); // Trigger useEffect on user change

//   return (
//     <Container>
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Admission Status
//         </Typography>
        
//         {loading && !error ? (
//           <CircularProgress />
//         ) : error ? (
//           <Alert severity="error">{error}</Alert> // Show error alert if there's an error
//         ) : (
//           <Typography variant="h6">Status: {status}</Typography>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default Status;
