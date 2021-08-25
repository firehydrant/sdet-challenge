import React from 'react';
import { Text, Flex, List, ListItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { formatRelative } from 'date-fns';

import fetcher from '../utils/fetcher';
import { ACTIVE_MILESTONES } from '../utils/constants';

function IncidentList({ loading, incidents, title }) {
  return !loading && incidents.length > 0 ? (
    <Flex
      width="100%"
      mx="auto"
      mt="4"
      px="4"
      justifyContent="space-between"
      flexDir="column">
      <Text as="h3" fontSize="16px" fontWeight="700" color="gray.700" mb="4">
        ({incidents.length}) {title}
      </Text>
      <List spacing={1} width="100%">
        {incidents.map((incident) => {
          return (
            <ListItem
              px="2"
              py="4"
              bg="white"
              borderRadius="sm"
              key={incident.id}>
              <Flex>
                <Flex flexDir="column" mr="12">
                  <Text
                    as={Link}
                    to={`/incidents/${incident.id}`}
                    fontSize="16px"
                    color="purple.700"
                    textDecoration="underline"
                    fontWeight="700">
                    {incident.name}
                  </Text>
                  <Text color="gray.500" fontSize="12px">
                    Started{' '}
                    {formatRelative(new Date(incident.created_at), new Date())}
                  </Text>
                </Flex>
                <Flex
                  flexDir="column"
                  flex="1"
                  mr="12"
                  justifyContent="space-between">
                  <Flex justifyContent="space-between">
                    <Text color="gray.700" fontSize="14px">
                      {incident.severity}
                    </Text>
                    <Text
                      color="gray.700"
                      fontSize="14px"
                      textTransform="capitalize">
                      {incident.milestone}
                    </Text>
                    <Text color="gray.700" fontSize="14px">
                      #{incident.id}
                    </Text>
                  </Flex>
                  <Text color="gray.500" fontSize="12px">
                    Updated{' '}
                    {formatRelative(new Date(incident.updated_at), new Date())}
                  </Text>
                </Flex>
              </Flex>
            </ListItem>
          );
        })}
      </List>
    </Flex>
  ) : (
    <Flex
      width="100%"
      mx="auto"
      mt="4"
      px="4"
      justifyContent="space-between"
      flexDir="column">
      <Text as="h3" fontSize="16px" fontWeight="700" color="gray.700" mb="4">
        No {title}
      </Text>
    </Flex>
  );
}

export default function Incidents() {
  const {
    isLoading: activeLoading,
    data: activeIncidents,
    error: activeError,
  } = useQuery('activeIncidents', () =>
    fetcher(
      `/incidents?${ACTIVE_MILESTONES.map(
        (milestone) => `milestone=${milestone}`
      ).join('&')}`
    )
  );

  const {
    isLoading: resolvedLoading,
    data: resolvedIncidents,
    error: resolvedError,
  } = useQuery('resolvedIncidents', () =>
    fetcher(`/incidents?milestone=resolved`)
  );

  if (resolvedError || activeError) {
    alert(resolvedError, activeError);
  }

  return (
    <Flex bg="#edf1f6" w="100%" h="100%" flexDir="column">
      <Flex px="4" py="6">
        <Text as="h1" fontSize="18px" fontWeight="700">
          Incidents
        </Text>
      </Flex>
      <IncidentList
        title="Active Incidents"
        loading={activeLoading}
        incidents={activeIncidents}
      />

      <IncidentList
        title="Resolved Incidents"
        loading={resolvedLoading}
        incidents={resolvedIncidents}
      />
    </Flex>
  );
}
