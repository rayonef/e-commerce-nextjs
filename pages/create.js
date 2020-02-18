import React from 'react'
import { Form, Input, TextArea, Button, Image, Message, Header, Icon } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchError from '../utils/catchErrors';

function CreateProduct() {
  const INITIAL_PRODUCT = {
    name: '',
    price: '',
    media: '',
    description: ''
  }

  const [product, setProduct] = React.useState(INITIAL_PRODUCT)
  const [mediaPreview, setMediaPreview] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const isValid = Object.values(product).every(el => Boolean(el));
    isValid ? setDisabled(false) : setDisabled(true);
  }, [product]);

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === 'media') {
      setProduct(prevState => ({ ...prevState, media: files[0] }))
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct((prevState) => ({ ...prevState, [name]: value }));
    }
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append('file', product.media);
    data.append('upload_preset', 'reactReserve'),
    data.append('clod_name', 'da30535ld');
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url;
    return mediaUrl;
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);
      setError('');
      const mediaUrl = await handleImageUpload();
      const url = `${baseUrl}/product`;
      const payload = { ...product, mediaUrl }
      payload.name = '';
      await axios.post(url, payload);
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch (error) {
      catchError(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form 
        loading={loading}
        success={success}
        error={Boolean(error)}
        onSubmit={handleSubmit}
      >
        <Message 
          error
          header="Oops!"
          content={error}
        />
        <Message 
          success
          icon="check"
          header="Success!"
          content="Product succesfully created"
        />
        <Form.Group widths="equal">
          <Form.Field 
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            value={product.name}
            onChange={handleChange}
          />
          <Form.Field 
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          <Form.Field 
            control={Input}
            type="file"
            name="media"
            label="Media"
            accept="image/*"
            content="Select Image"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small"/>
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />
        <Form.Field 
          control={Button}
          disabled={loading || disabled}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </>
  );
}

export default CreateProduct;
