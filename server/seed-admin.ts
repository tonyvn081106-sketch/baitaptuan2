import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { resolve } from 'path';

// Load env vars
dotenv.config({ path: resolve(__dirname, '.env') });

const MONGODB_URI = process.env.DATABASE_URL || 'mongodb+srv://tonyvn081106_db_user:123456a%40@cluster0.iptss4p.mongodb.net/DatLich?appName=Cluster0';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  name: String,
  role: { type: String, default: 'GUEST', enum: ['GUEST', 'ADMIN', 'RECEPTIONIST'] }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully.');

    const adminEmail = 'admin@gmail.com';
    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log('Admin already exists. Updating password and role...');
      existing.password_hash = await bcrypt.hash('admin123', 10);
      existing.role = 'ADMIN';
      await existing.save();
      console.log('Admin account updated successfully!');
      return;
    }

    const password_hash = await bcrypt.hash('admin123', 10);
    await User.create({
      email: adminEmail,
      password_hash,
      name: 'Super Admin',
      role: 'ADMIN'
    });
    
    console.log('Admin account created successfully!');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

seed();
