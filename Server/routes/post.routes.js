import express from 'express';
import authenticateToken from '../utils/authenticateToken.js';
import { createPost, deletePost, getAllPosts, getUserPosts } from '../controllers/posts.controller.js';

const router = express.Router();

router.post('/create', authenticateToken, createPost);
router.get('/get-user-posts', authenticateToken, getUserPosts).get('/get-all-posts', getAllPosts);
router.delete('/delete/:postId', authenticateToken, deletePost);

export default router;