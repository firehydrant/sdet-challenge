import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Flex, Text } from '@chakra-ui/react';

import IncidentForm from '../components/IncidentForm';

import fetcher from '../utils/fetcher';

export default function UpdateIncident() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery(['incident', id], () =>
    fetcher(`/incidents/${id}`)
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

  if (!isLoading && !data?.id) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <IncidentForm
      incident={data}
      title="Update an incident"
      submitText="Update incident"
    />
  );
}
