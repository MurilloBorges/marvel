import 'dotenv/config';
import app from './app';
import logger from './middlewares/logger';

const port = process.env.PORT || 3333;

app.listen(port, () => {
  logger.info('Server runing');
  console.log(`Servidor está rodando na porta: ${port}`);
});
