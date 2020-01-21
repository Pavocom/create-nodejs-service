export default function (req, res) {
  try {
    logger.info('test logger');
    return res.status(HttpStatus.OK).send();
  } catch (error) {
    logger.error(`create example ${error}`);
    throw error;
  }
}
