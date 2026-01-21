import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes';
import serviceRoutes from './routes/service.routes';
import galleryRoutes from './routes/gallery.routes';
import testimonialRoutes from './routes/testimonial.routes';
import contactRoutes from './routes/contact.routes';
import productRoutes from './routes/product.routes';
import pagemediaRoutes from './routes/pagemedia.routes';

dotenv.config(); // Load env from backend/.env

const app = express();
const port = process.env.PORT || 3001;
// Prisma client is now in lib/prisma.ts, but keeping this for now if used elsewhere or removing if unused. 
// However, the original file had it. I will leave it but the auth controller uses the one from lib.
// PrismaClient is initialized in lib/prisma.ts

app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/products', productRoutes);
app.use('/api/pagemedia', pagemediaRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
