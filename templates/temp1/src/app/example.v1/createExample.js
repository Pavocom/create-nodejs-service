

export default function (req, res) {
  try {
    logger.info('test logger');
    return res.status(HttpStatus.OK).jsend.success('success');
  } catch (error) {
    logger.error(`create example ${error}`);
    return res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).jsend.error(error);
  }
}
