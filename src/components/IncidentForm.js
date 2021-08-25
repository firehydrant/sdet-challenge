import React from 'react';
import {
  Text,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import fetcher from '../utils/fetcher';

let schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  severity: yup.string().required(),
  milestone: yup.string().required(),
});

export default function IncidentForm({ title, submitText, incident }) {
  const { mutate: declareIncident, data: declaredIncident } = useMutation(
    (data) =>
      fetcher('/incidents', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
  );

  const { mutate: updateIncident, data: updatedIncident } = useMutation(
    (data) =>
      fetcher(`/incidents/${incident.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
  );

  if (declaredIncident?.id || updatedIncident?.id) {
    return (
      <Redirect
        to={`/incidents/${declaredIncident?.id || updatedIncident?.id}`}
      />
    );
  }

  return (
    <Formik
      initialValues={
        incident || {
          id: Math.floor(Math.random() * 1000),
          name: '',
          description: '',
          severity: '',
          milestone: '',
        }
      }
      onSubmit={(values, { setSubmitting }) => {
        if (incident?.id) {
          updateIncident({
            ...values,
            updated_at: new Date(),
          });
        } else {
          declareIncident({
            ...values,
            created_at: new Date(),
            updated_at: new Date(),
          });
        }
      }}
      validationSchema={schema}>
      {({
        isSubmitting,
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        handleSubmit,
      }) => (
        <Flex as={Form} flexDir="column" w="100%" bg="#edf1f6" h="100%">
          <Flex flexDir="column">
            <Flex px="4" py="6">
              <Text as="h1" fontSize="24px" fontWeight="700">
                {title}
              </Text>
            </Flex>
            <Flex flexDir="column" px="4" py="6" bg="white" mx="4" mb="4">
              <FormControl id="name" isInvalid={errors.name && touched.name}>
                <FormLabel fontSize="18px" fontWeight="700">
                  Incident Name
                </FormLabel>
                <Input
                  type="text"
                  placeholder="name this incident*"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <FormErrorMessage>*required</FormErrorMessage>
              </FormControl>
              <FormControl id="descripion" mt="6">
                <FormLabel fontSize="18px" fontWeight="700">
                  Description (optional)
                </FormLabel>
                <Textarea
                  type="text"
                  placeholder="describe this incident"
                  name="descripion"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.descripion}
                />
              </FormControl>
              <FormControl
                id="severity"
                mt="6"
                isInvalid={errors.severity && touched.severity}>
                <FormLabel fontSize="18px" fontWeight="700">
                  Severity
                </FormLabel>
                <Select
                  type="select"
                  placeholder="Select option"
                  name="severity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.severity}>
                  <option value="UNSET">UNSET</option>
                  <option value="SEV1">SEV1</option>
                  <option value="SEV2">SEV2</option>
                  <option value="SEV3">SEV3</option>
                  <option value="SEV4">SEV4</option>
                  <option value="SEV5">SEV5</option>
                </Select>
                <FormErrorMessage>*required</FormErrorMessage>
              </FormControl>

              <FormControl
                id="status"
                mt="6"
                isInvalid={errors.milestone && touched.milestone}>
                <FormLabel fontSize="18px" fontWeight="700">
                  Milestone
                </FormLabel>
                <Select
                  type="select"
                  placeholder="Select option"
                  name="milestone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.milestone}>
                  <option value="started">Started</option>
                  <option value="detected">Detected</option>
                  <option value="acknowledged">Acknowledged</option>
                  <option value="mitigated">Mitigated</option>
                  <option value="resolved">Resolved</option>
                </Select>
                <FormErrorMessage>*required</FormErrorMessage>
              </FormControl>
              <Flex mt="6">
                <Button
                  type="submit"
                  isDisabled={isSubmitting}
                  bg="#3c2492"
                  color="white"
                  fontWeight="700"
                  _hover={{ bg: '#614ab6' }}
                  _active={{ bg: '#220e6d' }}>
                  {submitText}
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Formik>
  );
}
