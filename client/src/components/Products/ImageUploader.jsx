import React from "react";

const ImageUploader = ({ inputRef, imageFile, setImageFile, isRequired }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    const formattedFile = {
      uid: Date.now(),
      name: file.name,
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      originFileObj: file,
      size: file.size,
      type: file.type,
    };

    setImageFile(formattedFile);
  };

  return (
    <div>
      {" "}
      <label>
        <span className="text-red-400 text-xs mr-1">*</span>Product Image
      </label>
      <label
        for="custom-input"
        className="block text-sm text-gray-300   p-2
rounded-md  font-semibold border-gray-300 border
hover:border-blue-500 cursor-pointer"
      >
        Choose an Image
      </label>
      <div className="flex flex-col">
        <label className="text-sm text-gray-400 px-1">{imageFile?.name}</label>
      </div>
      <input
        type="file"
        onChange={handleChange}
        ref={inputRef}
        id="custom-input"
        className="invisible"
        required={isRequired ? true : false}
      />
    </div>
  );
};

export default ImageUploader;
