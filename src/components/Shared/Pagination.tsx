import { Stack, Button } from '@mui/material';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" my={2}>
      <Button variant="outlined" onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button variant="outlined" onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </Button>
    </Stack>
  );
};

export default Pagination;
