const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate;

  //get candidate
  const getCandidate = (data) => {
    return crypto.createHash("sha3-512").update(data).digest("hex");
  }

  //check candidate date type
  const isNotString = (data) => {
    return typeof data !== "string";
  }

  //check max length valid
  const isLengthNotValid = (data) => {
    return data.length > MAX_PARTITION_KEY_LENGTH
  }

  if (event) {
    //get partitionKey
    let partitionKey = event?.partitionKey;

    //get existing candidate or new candidate
    candidate = partitionKey ? partitionKey : getCandidate(JSON.stringify(event));

    //check candidate type and change to string
    candidate = isNotString(candidate) ? JSON.stringify(candidate) : candidate;

    candidate = isLengthNotValid(candidate) ? getCandidate(candidate) : candidate;

  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  return candidate;
}