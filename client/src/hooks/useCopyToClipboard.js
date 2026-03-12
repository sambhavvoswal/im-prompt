import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export const useCopyToClipboard = () => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = useCallback(async (text, posterId) => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported');
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            toast.success('✓ Prompt copied to clipboard!', {
                style: {
                    background: '#10b981',
                    color: '#fff',
                    fontWeight: 'bold'
                },
            });

            // Fire and forget copy count increment
            if (posterId) {
                axios.post(`${import.meta.env.VITE_API_BASE_URL}/posters/${posterId}/copy`)
                    .catch(err => console.error("Failed to increment copy count", err));
            }

            setTimeout(() => setIsCopied(false), 2000);
            return true;
        } catch (error) {
            console.warn('Copy failed', error);
            toast.error('Failed to copy prompt');
            setIsCopied(false);
            return false;
        }
    }, []);

    return [isCopied, copyToClipboard];
};
