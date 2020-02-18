function catchError(error, displayError) {
  let errorMsg;
  if (error.response) {
    errorMsg = error.response.data;

    // cloudinary
    if(error.response.data.error) {
      errorMsg = error.response.data.error.message
    }
  } else if (error.request) {
    errorMsg = error.request;
  } else {
    errorMsg = error.message;
  }

  displayError(errorMsg);
}

export default catchError;