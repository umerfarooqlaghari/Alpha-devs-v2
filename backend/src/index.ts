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
import optimizationRoutes from './routes/optimization.routes';
import blogRoutes from './routes/blog.routes';
import faqRoutes from './routes/faq.routes';
import analyticsRoutes from './routes/analytics.routes';

dotenv.config(); // Load env from backend/.env

const app = express();
const port = process.env.PORT || 3001;
// Prisma client is now in lib/prisma.ts, but keeping this for now if used elsewhere or removing if unused. 
// However, the original file had it. I will leave it but the auth controller uses the one from lib.
// PrismaClient is initialized in lib/prisma.ts

// CORS configuration - allow multiple origins for development and production
const allowedOrigins = [
  'http://localhost:3000',
  'https://alpha-devs-frontend.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins for now, can be restricted later
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use('/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/products', productRoutes);
app.use('/api/pagemedia', pagemediaRoutes);
app.use('/api/optimization', optimizationRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
