const stream = require("stream");

const s3 = require("./s3.js");

const createUploadStream = (key) => {
  const pass = new stream.PassThrough();
  return {
    writeStream: pass,
    promise: s3
      .upload({
        Bucket: s3.params.Bucket,
        Key: key,
        Body: pass,
      })
      .promise(),
  };
};

module.exports = createUploadStream;
