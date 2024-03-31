import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface DialogReviewProps {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  submitReview: () => void;
  openDialog: boolean;
  rating: number;
  comment: string;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

const DialogReview: React.FC<DialogReviewProps> = ({
  setOpenDialog,
  submitReview,
  openDialog,
  rating,
  comment,
  setRating,
  setComment,
}) => {
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    submitReview();
    handleClose();
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your rating and comment here. We appreciate your
            feedback.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="rating"
            name="rating"
            label="Rating"
            type="number"
            fullWidth
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="comment"
            name="comment"
            label="Comment"
            type="text"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogReview;
