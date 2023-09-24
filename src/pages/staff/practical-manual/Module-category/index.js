


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Grid, Button } from '@mui/material';
import FormLayoutsAlignment from './FormLayoutsAlignment'; // Import your ModuleForm component
import { useRouter } from 'next/router';
import TableStickyHeader from './TableStickyHeader';

const ModuleCategory = () => {
  const router = useRouter();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleUploadRedirect = () => {
    router.push('staff/practical-manual/Module-category/FileUploaderMultiple');
  };

  const handleAddModuleClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Module Category'
            action={
              <Button
                variant='contained'
                onClick={isFormVisible ? handleCloseForm : handleAddModuleClick}
              >
                {isFormVisible ? 'Close Form' : 'Add Module'}
              </Button>
            }
          />
          <CardContent>
            {isFormVisible ? (
              <FormLayoutsAlignment onClose={handleCloseForm} />
            ) : (
              <TableStickyHeader />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ModuleCategory;
