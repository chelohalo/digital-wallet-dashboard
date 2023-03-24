export function hexTimestampToDate(hexTimestamp) {
  const timestampInSeconds = parseInt(hexTimestamp);
  const timestampInMillis = timestampInSeconds * 1000;
  return new Date(timestampInMillis);
}
