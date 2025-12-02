import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import todosRouter from './routers/todos.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB 연결
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-db';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('연결 성공');
  })
  .catch((error) => {
    console.error('MongoDB 연결 실패:', error);
  });

// Express 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터 연결 (API 라우터를 먼저 등록)
app.use('/api/todos', todosRouter);

// 정적 파일 제공
const publicPath = join(__dirname, 'public');
console.log('정적 파일 경로:', publicPath);
app.use(express.static(publicPath));

// 기본 라우트
app.get('/', (req, res) => {
  const indexPath = join(__dirname, 'public', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('파일 전송 오류:', err);
      res.status(500).send('파일을 찾을 수 없습니다.');
    }
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}번에서 실행 중입니다.`);
});
