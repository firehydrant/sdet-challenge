import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';

export default function ConfirmModal({
  isOpen,
  onClose,
  archiveIncident,
  incident,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          #{incident.id} {incident.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to archive this incident?</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            bg="white"
            color="#3c2492"
            fontWeight="700"
            borderColor="#3c2492"
            border="1px solid"
            mr={3}
            _hover={{ color: '#614ab6' }}
            _active={{ color: '#220e6d' }}>
            Close
          </Button>
          <Button
            bg="white"
            color="red.600"
            fontWeight="700"
            border="1px solid"
            onClick={() => {
              archiveIncident();
            }}
            _hover={{ color: 'red.500' }}
            _active={{ color: 'red.700' }}>
            Confirm archive incident
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
