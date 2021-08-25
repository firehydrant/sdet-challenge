import React from 'react';
import {
  Flex,
  Button,
  Text,
  ButtonGroup,
  useDisclosure,
} from '@chakra-ui/react';
import { Link, useParams, Redirect } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { formatRelative } from 'date-fns';

import ConfirmModal from '../components/ConfirmModal';
import fetcher from '../utils/fetcher';

export default function Incident() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, data, error } = useQuery(['incident', id], () =>
    fetcher(`/incidents/${id}`)
  );

  const { mutate: archiveIncident, isSuccess } = useMutation((id) =>
    fetcher(`/incidents/${id}`, { method: 'DELETE' })
  );

  if (error) {
    alert(error);
  }

  if (isLoading) {
    return (
      <Flex bg="#edf1f6" w="100%" minH="100vh" flexDir="column">
        <Flex px="4" py="6" justifyContent="space-between" alignItems="center">
          <Text as="h1" fontSize="18px" fontWeight="700">
            Loading...
          </Text>
        </Flex>
      </Flex>
    );
  }

  if ((!isLoading && !data) || isSuccess) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Flex bg="#edf1f6" w="100%" minH="100vh" flexDir="column">
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        incident={data}
        archiveIncident={() => archiveIncident(id)}
      />
      <Flex px="4" py="6" justifyContent="space-between" alignItems="center">
        <Text as="h1" fontSize="18px" fontWeight="700">
          #{data.id} {data.name}
        </Text>
        <ButtonGroup>
          <Button
            as={Link}
            to={`/incidents/${id}/edit`}
            bg="white"
            color="#3c2492"
            fontWeight="700"
            borderColor="#3c2492"
            border="1px solid"
            _hover={{ color: '#614ab6' }}
            _active={{ color: '#220e6d' }}>
            Edit incident
          </Button>
          <Button
            bg="white"
            color="red.600"
            fontWeight="700"
            border="1px solid"
            onClick={onOpen}
            _hover={{ color: 'red.500' }}
            _active={{ color: 'red.700' }}>
            Archive incident
          </Button>
        </ButtonGroup>
      </Flex>
      <Flex px="4" py="3" flexDir="column">
        <Text fontSize="16px" color="gray.700" fontWeight="700">
          Description
        </Text>
        <Text color="gray.600" maxWidth="800px">
          {data.description}
        </Text>
      </Flex>
      <Flex px="4" py="3">
        <Flex flex="1" flexDir="column">
          <Text fontSize="16px" color="gray.700" fontWeight="700">
            Severity
          </Text>
          <Text color="gray.600">{data.severity}</Text>
        </Flex>
        <Flex flex="1" flexDir="column">
          <Text fontSize="16px" color="gray.700" fontWeight="700">
            Milestone
          </Text>
          <Text color="gray.600" textTransform="capitalize">
            {data.milestone}
          </Text>
        </Flex>
      </Flex>
      <Flex px="4" py="3">
        <Flex flex="1" flexDir="column">
          <Text fontSize="16px" color="gray.700" fontWeight="700">
            Created At
          </Text>
          <Text color="gray.600">
            {formatRelative(new Date(data.created_at), new Date())}
          </Text>
        </Flex>
        <Flex flex="1" flexDir="column">
          <Text fontSize="16px" color="gray.700" fontWeight="700">
            Updated At
          </Text>
          <Text color="gray.600">
            {formatRelative(new Date(data.updated_at), new Date())}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
