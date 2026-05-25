'use client';

import { useRef, useState } from 'react';

import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handlePickerClicked() {
    imageInput.current.click();
  }

  function imageChangedHandler(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const filereader = new FileReader();
    filereader.onload = () => {
      setPickedImage(filereader.result);
    };
    filereader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage ? <p>No image picked yet.</p> : null}
          {pickedImage ? (
            <Image
              src={pickedImage}
              alt='The image selected by the user.'
              fill
            />
          ) : null}
        </div>
        <input
          className={classes.input}
          type='file'
          name={name}
          id={name}
          accept='image/png, image/jpeg'
          ref={imageInput}
          onChange={imageChangedHandler}
          required
        />
        <button
          className={classes.button}
          type='button'
          onClick={handlePickerClicked}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
