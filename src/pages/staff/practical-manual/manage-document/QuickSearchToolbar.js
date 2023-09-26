import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from Next.js
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import { ButtonsContained } from './ButtonsContained';

const QuickSearchToolbar = () => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [editConfirmationOpen, setEditConfirmationOpen] = useState(false);
  const [downloadAlertOpen, setDownloadAlertOpen] = useState(false);

  const handleOpenDeleteConfirmation = () => {
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleOpenEditConfirmation = () => {
    setEditConfirmationOpen(true);
  };

  const handleCloseEditConfirmation = () => {
    setEditConfirmationOpen(false);
  };

  const handleOpenDownloadAlert = () => {
    setDownloadAlertOpen(true);
  };

  const handleCloseDownloadAlert = () => {
    setDownloadAlertOpen(false);
  };

  const handleDeleteRow = useCallback(() => {
    // You can log a message here
    console.log("Delete Row clicked");

    handleOpenDeleteConfirmation();

    // Store the row data that needs to be deleted
    // (you can use state to store this temporarily)
  }, []);

  const handleEditRow = useCallback(() => {
    // You can log a message here
    console.log("Edit Row clicked");

    handleOpenEditConfirmation();

    // Store the row data that needs to be edited
    // (you can use state to store this temporarily)
  }, []);

  const handleDeleteConfirmed = () => {
    // Implement the logic to delete the module
    // Close the confirmation dialog
    handleCloseDeleteConfirmation();
  };

  const handleEditConfirmed = () => {
    // Implement the logic to edit the module
    // Close the confirmation dialog
    handleCloseEditConfirmation();
  };

  const handleDownloadRow = useCallback(() => {
    // Implement the logic to trigger download
    // You can use window.alert for testing
    window.alert('Successfully downloaded!');
  }, []);

  const router = useRouter(); // Get the router object

  const manageDocument = () => {
    // Handle the routing logic here
    router.push('/staff/practical-manual/manage-document/fileManagerMultiple');
  };

  return (
    <>
      {/* Your table components and other UI elements go here */}
      {/* Example of adding click events to buttons */}
      <Button onClick={handleDeleteRow}>Delete Row</Button>
      <Button onClick={handleEditRow}>Edit Row</Button>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmationOpen}>
        <DialogTitle>Delete Module</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this module?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="primary">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Confirmation Dialog */}
      <Dialog open={editConfirmationOpen}>
        <DialogTitle>Edit Module</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to edit this module?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditConfirmed} color="primary">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuickSearchToolbar;
