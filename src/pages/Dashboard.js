import React from 'react';
import {
  Text,
  Box,
  Flex,
  Button,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useQuery } from 'react-query';
import { formatRelative } from 'date-fns';

import fetcher from '../utils/fetcher';
import { ACTIVE_MILESTONES } from '../utils/constants';

export default function Home() {
  const { isLoading, data, error } = useQuery('activeIncidents', () =>
    fetcher(
      `/incidents?${ACTIVE_MILESTONES.map(
        (milestone) => `milestone=${milestone}`
      ).join('&')}&_limit=5`
    )
  );

  if (error) {
    alert(error);
  }

  return (
    <Flex flexDir="column" w="100%">
      <Flex bg="#edf1f6" px="8" pt="24" pb="8">
        <Flex
          maxWidth="1100px"
          width="100%"
          margin="0 auto"
          justifyContent="space-between"
          alignItems="center">
          <Text as="h1" fontSize="36px" fontWeight="700">
            Welcome User
          </Text>
          <Button
            as={Link}
            to="/incidents/new"
            bg="#3c2492"
            color="white"
            fontWeight="700"
            _hover={{ bg: '#614ab6' }}
            _active={{ bg: '#220e6d' }}>
            Declare an incident
          </Button>
        </Flex>
      </Flex>
      {!isLoading && data?.length > 0 ? (
        <Flex px="8" pt="20" pb="8" flexDir="column">
          <Flex
            maxWidth="1100px"
            width="100%"
            margin="0 auto"
            justifyContent="space-between"
            alignItems="center">
            <Box>
              <Text as="h2" fontSize="24px" fontWeight="700">
                There are {data.length} active incidents
              </Text>
              <Text color="#61718f" mt="1">
                Showing up to the 5 most recently created incidents
              </Text>
            </Box>
            <Button
              as={Link}
              to="/incidents"
              bg="white"
              color="#3c2492"
              fontWeight="700"
              borderColor="#3c2492"
              border="1px solid"
              rightIcon={<Icon as={HiOutlineArrowRight} />}
              _hover={{ color: '#614ab6' }}
              _active={{ color: '#220e6d' }}>
              View all incidents
            </Button>
          </Flex>
          <Flex
            maxWidth="1100px"
            width="100%"
            mx="auto"
            mt="40px"
            justifyContent="space-between"
            alignItems="center">
            <Table>
              <Thead>
                <Tr>
                  <Th fontSize="16px" textTransform="none">
                    ID
                  </Th>
                  <Th fontSize="16px" textTransform="none">
                    Incident name
                  </Th>
                  <Th fontSize="16px" textTransform="none">
                    Severity
                  </Th>
                  <Th fontSize="16px" textTransform="none">
                    Status
                  </Th>
                  <Th fontSize="16px" textTransform="none">
                    Duration
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((incident) => {
                  return (
                    <Tr key={incident.id}>
                      <Td fontSize="16px" textTransform="none">
                        {incident.id}
                      </Td>
                      <Td fontSize="16px" textTransform="none">
                        <Text
                          as={Link}
                          to={`/incidents/${incident.id}`}
                          fontSize="16px"
                          color="purple.700"
                          textDecoration="underline"
                          fontWeight="700">
                          {incident.name}
                        </Text>
                      </Td>
                      <Td fontSize="16px" textTransform="none">
                        {incident.severity}
                      </Td>
                      <Td fontSize="16px" textTransform="capitalize">
                        {incident.milestone}
                      </Td>
                      <Td fontSize="16px" textTransform="none">
                        {formatRelative(
                          new Date(incident.created_at),
                          new Date()
                        )}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Flex>
        </Flex>
      ) : (
        <Flex px="8" pt="20" pb="8" flexDir="column">
          <Flex
            maxWidth="1100px"
            width="100%"
            margin="0 auto"
            justifyContent="space-between"
            alignItems="center">
            <Box>
              <Text as="h2" fontSize="24px" fontWeight="700">
                There are no active incidents
              </Text>
            </Box>
            <Button
              as={Link}
              to="/incidents"
              bg="white"
              color="#3c2492"
              fontWeight="700"
              borderColor="#3c2492"
              border="1px solid"
              rightIcon={<Icon as={HiOutlineArrowRight} />}
              _hover={{ color: '#614ab6' }}
              _active={{ color: '#220e6d' }}>
              View all incidents
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
