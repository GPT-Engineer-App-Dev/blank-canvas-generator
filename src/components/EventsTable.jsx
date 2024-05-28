import React from 'react';
import { useSupabaseQuery } from '../integrations/supabase';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

const fetchEvents = async (supabase) => {
  const { data, error } = await supabase
    .from('events')
    .select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const EventsTable = () => {
  const { data, error, isLoading } = useSupabaseQuery(['events'], fetchEvents);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }

  return (
    <Box overflowX="auto" p={4}>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Description</Th>
            <Th>Venue ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(event => (
            <Tr key={event.id}>
              <Td>{event.id}</Td>
              <Td>{event.name}</Td>
              <Td>{event.date}</Td>
              <Td>{event.description}</Td>
              <Td>{event.venue_id}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EventsTable;