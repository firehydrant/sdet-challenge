import React from 'react';
import { Flex, Button, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

export default function BreadCrumbNav() {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return (
    <Flex
      flexDir="column"
      w="100%"
      borderBottom="1px solid"
      borderBottomColor="gray.300">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        bg="#edf1f6"
        minH="72px"
        px="4"
        py="4">
        <Text textTransform="capitalize" color="gray.600" fontWeight="700">
          {location.pathname.split('/')[1]}{' '}
        </Text>
        {location.pathname === '/incidents' && (
          <Button
            as={Link}
            to="/incidents/new"
            bg="#3c2492"
            color="white"
            fontWeight="700"
            _hover={{ bg: '#614ab6' }}
            _active={{ bg: '#220e6d' }}>
            Declare incident
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
