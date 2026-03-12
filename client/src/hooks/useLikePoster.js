import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useLikePoster = (posterId, initialLikes) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(initialLikes || 0);

    // Initialize state from localStorage
    useEffect(() => {
        if (!posterId) return;

        try {
            const likedPosters = JSON.parse(localStorage.getItem('liked_posters') || '[]');
            if (likedPosters.includes(posterId)) {
                setIsLiked(true);
            }
        } catch (e) {
            console.error("Failed to parse liked_posters from localStorage", e);
        }
    }, [posterId]);

    const toggleLike = useCallback(async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!posterId) return;

        // We only support "liking" once in this simple local-storage V1 implementation.
        // "Unliking" is not supported backend-side yet, so we just return if already liked.
        if (isLiked) {
            toast('You already loved this prompt! ❤️', { icon: '🙌' });
            return;
        }

        // Optimistic UI Update
        setIsLiked(true);
        setLikes(prev => prev + 1);

        // Save to LocalStorage
        try {
            const likedPosters = JSON.parse(localStorage.getItem('liked_posters') || '[]');
            if (!likedPosters.includes(posterId)) {
                likedPosters.push(posterId);
                localStorage.setItem('liked_posters', JSON.stringify(likedPosters));
            }
        } catch (err) {
            console.warn("Storage restricted", err);
        }

        // API Call
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/posters/${posterId}/like`);
            // Optionally sync real count from response here if concurrent likes are a big concern.
            // const res = await axios.post(...); setLikes(res.data.likes);
        } catch (err) {
            console.error('Failed to like poster:', err);
            // Revert optimistic update
            setIsLiked(false);
            setLikes(prev => prev - 1);

            try {
                const likedPosters = JSON.parse(localStorage.getItem('liked_posters') || '[]');
                const updated = likedPosters.filter(id => id !== posterId);
                localStorage.setItem('liked_posters', JSON.stringify(updated));
            } catch (e) {
                /* ignore */
            }

            toast.error('Failed to save like. Try again later.');
        }
    }, [posterId, isLiked]);

    return { isLiked, likes, toggleLike };
};
